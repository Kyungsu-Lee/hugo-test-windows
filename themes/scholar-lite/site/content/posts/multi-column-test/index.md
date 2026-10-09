---
title: "Multi-Column Layout User Guide"
date: 2025-08-06
venue: "Documentation"
keywords: ["Multi-Column", "Layout", "Guide"]
---

This guide explains how to use the multi-column layout feature on your website.

## Basic Syntax

Use the `multi-col` identifier to create a multi-column layout:

`````````markdown
``````multi-col
```col
Column 1 content
```
```col
Column 2 content
```
``````
`````````

## Special Column Styles

### Bordered Column (col-border)

Adds a border to the specified column:

`````````markdown
``````multi-col
```col-border
**Bordered Column**
This column will have a nice border effect
```
```col
Normal column content
```
``````
`````````

### Shaded Column (col-shade)

Adds a shadow effect to the specified column:

`````````markdown
``````multi-col
```col
Normal column content
```
```col-shade
**Shaded Column**
This column will have a shadow and hover effect
```
``````
`````````

## Syntax Hierarchy Rules

<div class="table-title">Example Syntax for Backtick Count</div>

Choose the appropriate number of backticks based on content complexity:

| Content Type | Number of Backticks | Example Syntax |
|----------|---------|----------|
| Simple Text  | 6 | `col`, `col-border`, `col-shade` |
| Contains Code Blocks | 9 | Same as above, but use 9 backticks for the outer block |
| Complex Nesting | 12 | Same as above, but use 12 backticks for the outer block |

<div class="table-note">
<strong>Rule</strong>: The number of outer backticks must be at least 3 more than the largest number of consecutive backticks within the content.
</div>


## Examples

### Basic Two-Column Layout

``````multi-col
```col
**左列**
- 项目1
- 项目2
- 项目3
```
```col
**右列**
1. 步骤一
2. 步骤二
3. 步骤三
```
``````

### Multi-Column with Code Blocks

`````````multi-col
``````col
**Python Code Example**

```python
def example():
    print("Hello World!")
    return True
```

Code description text
``````
``````col
**Configuration Example**

```yaml
# Configuration file
settings:
  enabled: true
  mode: "production"
```

Configuration description text
``````
`````````

### Three-Column Image Display

``````multi-col
```col
![Fairy](posts/multi-column-test/fairy.png)
**Fairy**
```
```col
![Japanese Goblin](posts/multi-column-test/japanese_goblin.png)
**Japanese Goblin**
```
```col
![Mage](posts/multi-column-test/mage.png)
**Mage**
```
``````

### Border and Shade Demonstration

``````multi-col
```col-border
**📋 Important Note**

This is an important information box with a border.

- Important info 1
- Important info 2
- Important info 3

> The border color automatically adapts to the theme
```
```col-shade
**🎨 Design Highlight**

This is a design showcase area with a shadow.

It has an animation effect on mouse hover:
- Deeper shadow
- Slightly raised

Perfect for highlighting important content!
```
```col
**📝 Normal Content**

This is normal column content with no special styling.

Used for comparison, you can see:
- The distinction of the bordered column
- The depth of the shaded column
- The simplicity of the normal column
```
``````

## Features
- ✅ Auto-detects column count (2-8 columns)
- ✅ Responsive design (stacks to a single column on mobile)
- ✅ Full syntax highlighting support
- ✅ Supports any Markdown content
- ✅ Flexible backtick hierarchy system
- ✅ Bordered column (col-border)
- ✅ Shaded column (col-shade)

### Best Practices

1. Choose the Right Backtick Count: Select based on content complexity
2. Keep Column Content Balanced: Try to keep the length of each column similar
3. Mobile-Friendly: Consider the display on small screens
4. Clear Semantics: Use meaningful titles for columns

## Shortcode Alternative

If you prefer not to use the code block syntax, you can also use a shortcode:

{{< columns "3" >}}
## Column 1
**Robot**
![Robot](posts/multi-column-test/robot_face.png)
---
## Column 2
**Smiling Imp**
![Smiling Imp](posts/multi-column-test/smiling_imp.png)
---
## Column 3
**Star-Struck Face**
![Star Struck](posts/multi-column-test/star_struck.png)
{{< /columns >}}

---

This multi-column layout system provides a powerful and flexible way to organize content.