import base64, hashlib, json, re
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import urljoin,urlparse,unquote

def audit(public,base):
    public=Path(public); paths={p.relative_to(public).as_posix():p for p in public.rglob('*') if p.is_file()}
    basepath=urlparse(base).path; host=urlparse(base).netloc
    missing=set(); wrong_prefix=set(); external=set(); sri_errors=[]; asset_count=0; link_count=0
    homepage_assets=set(); internal=[]; html_count=0
    def resolve(value,page):
        if not value or value.startswith(('data:','mailto:','tel:','javascript:','#')): return None
        u=urlparse(urljoin(base+page,value))
        if u.netloc != host: external.add(u.netloc); return None
        path=unquote(u.path)
        if not path.startswith(basepath): wrong_prefix.add(value); return None
        rel=path[len(basepath):]
        candidates=[rel,rel.rstrip('/')+'/index.html']
        if not rel: candidates=['index.html']
        return next((x for x in candidates if x in paths),False)
    class Parser(HTMLParser):
        def __init__(self,page): super().__init__(convert_charrefs=True); self.page=page
        def handle_starttag(self,tag,attrs):
            nonlocal asset_count,link_count
            a=dict(attrs); references=[]
            if tag in ('img','script','iframe','source','video','audio','embed','input') and a.get('src'): references.append(a['src'])
            if tag=='video' and a.get('poster'): references.append(a['poster'])
            if tag=='link' and a.get('href') and any(x in a.get('rel','').split() for x in ('stylesheet','icon','preload','modulepreload','apple-touch-icon')): references.append(a['href'])
            if a.get('srcset') and not a['srcset'].startswith('data:'):
                references.extend(x.strip().split()[0] for x in a['srcset'].split(',') if x.strip())
            for url in references:
                resolved=resolve(url,self.page); asset_count+=1
                if resolved is False: missing.add(url)
                if self.page=='index.html' and resolved: homepage_assets.add(resolved)
                if resolved and a.get('integrity'):
                    for token in a['integrity'].split():
                        algorithm,_,digest=token.partition('-')
                        if algorithm in ('sha256','sha384','sha512'):
                            actual=base64.b64encode(hashlib.new(algorithm,paths[resolved].read_bytes()).digest()).decode()
                            if actual!=digest: sri_errors.append({'html':self.page,'asset':resolved,'algorithm':algorithm})
            if tag=='a' and a.get('href'):
                link_count+=1; target=resolve(a['href'],self.page)
                if target and target.endswith('index.html') and target!='index.html' and self.page=='index.html': internal.append(target)
    for rel,p in paths.items():
        if rel.endswith('.html'):
            html_count+=1; Parser(rel).feed(p.read_text(encoding='utf-8',errors='replace'))
        elif rel.endswith('.css'):
            for url in re.findall(r'url\(\s*[\"\']?([^\"\')]+)',p.read_text(encoding='utf-8',errors='replace')):
                if resolve(url.strip(),rel) is False: missing.add(url.strip())
    return {'html_count':html_count,'asset_references':asset_count,'internal_link_references':link_count,'missing_assets':sorted(missing),'wrong_prefix_urls':sorted(wrong_prefix),
        'local_sri_errors':sri_errors,'external_hosts':sorted(external),'homepage_assets':sorted(homepage_assets),'homepage_internal_pages':sorted(set(internal)),
        'search_files':[x for x in paths if re.search(r'(search|index\.json|pagefind)',x,re.I)],'status':'passed' if not missing and not wrong_prefix and not sri_errors else 'issues'}
