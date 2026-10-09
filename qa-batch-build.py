"""Linux Actions harness. Inputs are exported from actual Windows Git commits."""
import hashlib, json, os, shutil, subprocess, sys, tarfile, time, urllib.request
from pathlib import Path
from qa_asset_audit import audit

ROOT=Path.cwd()
SHARD=int(sys.argv[1]); SHARDS=int(sys.argv[2])
MANIFEST=json.loads((ROOT/'qa-inputs.json').read_text())
ROWS=MANIFEST[SHARD::SHARDS]
LOGS=ROOT/'qa-output'/('shard-'+str(SHARD)); LOGS.mkdir(parents=True,exist_ok=True)
PUBLIC=ROOT/'qa-public'; PUBLIC.mkdir(exist_ok=True)
BASE='https://kyungsu-lee.github.io/hugo-test-windows/'
TOOLS=Path(os.environ['RUNNER_TEMP'])/'qa-hugo'
RESULT=[]
def install(version):
    folder=TOOLS/version
    if not (folder/'hugo').is_file():
        folder.mkdir(parents=True,exist_ok=True)
        archive=folder/'hugo.tar.gz'
        url=f'https://github.com/gohugoio/hugo/releases/download/v{version}/hugo_extended_{version}_linux-amd64.tar.gz'
        subprocess.run(['curl','-fL','--retry','3','-o',str(archive),url],check=True)
        with tarfile.open(archive) as tar: tar.extractall(folder,filter='data')
    return folder
for row in ROWS:
    slug=row['slug']; cwd=ROOT/'themes'/slug; logs=LOGS/slug; logs.mkdir(exist_ok=True)
    result={'slug':slug,'windows_commit_sha':row['windows_commit_sha'],'batch_commit_sha':os.environ['GITHUB_SHA'],'run_id':os.environ['GITHUB_RUN_ID'],'build_status':'failed','started':time.time()}
    try:
        # Verify every exported file against the bytes read back from Windows Git.
        for rel,expected in row['files'].items():
            p=cwd/rel
            if hashlib.sha256(p.read_bytes()).hexdigest()!=expected: raise ValueError('Windows committed bytes differ: '+rel)
        state=json.loads((cwd/'.github-pages.json').read_text())
        env=dict(os.environ,HUGO_ENVIRONMENT='production',SITE_BASE_URL=BASE+slug+'/',GOMAXPROCS='2')
        env['PATH']=str(install(state['version']))+os.pathsep+env['PATH']
        for mode in ['--dependencies','--build']:
            with (logs/(mode[2:]+'.stdout.txt')).open('wb') as out, (logs/(mode[2:]+'.stderr.txt')).open('wb') as err:
                p=subprocess.run([sys.executable,'.github/pages_build.py',mode],cwd=cwd,env=env,stdout=out,stderr=err,timeout=1200)
            result[mode[2:]+'_exit']=p.returncode
            if p.returncode: raise RuntimeError(mode+' exit '+str(p.returncode))
        public=cwd/'public'; assert (public/'index.html').is_file()
        files={p.relative_to(public).as_posix():hashlib.sha256(p.read_bytes()).hexdigest() for p in public.rglob('*') if p.is_file()}
        (logs/'public-hashes.json').write_text(json.dumps(files))
        asset_check=audit(public,BASE+slug+'/')
        (logs/'asset-check.json').write_text(json.dumps(asset_check,indent=2))
        result.update(build_status='passed',html_sha256=files['index.html'],public_file_count=len(files),public_bytes=sum(p.stat().st_size for p in public.rglob('*') if p.is_file()),hugo_version=state['version'],asset_check_status=asset_check['status'])
        shutil.copytree(public,PUBLIC/slug)
        shutil.rmtree(public)
    except Exception as e: result['error']=str(e)
    result['ended']=time.time(); RESULT.append(result)
    (LOGS/'build-results.json').write_text(json.dumps(RESULT,indent=2))
    print(slug+': '+result['build_status']+(' '+result.get('error','')),flush=True)
    # Keep each runner's footprint bounded as Node and Go tools are installed per theme.
    for folder in [cwd/'.pages-tools',cwd/'site/node_modules',cwd/'site/themes/template/node_modules']:
        if folder.exists(): shutil.rmtree(folder)
print('SHARD COMPLETE',SHARD,len(RESULT),flush=True)
