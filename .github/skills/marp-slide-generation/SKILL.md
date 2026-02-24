---
name: marp-slide-generation
description: Create and edit professional presentation slides using MARP (Markdown Presentation Ecosystem). Supports Otto Group branding, LOTR-themed content, code syntax highlighting, and two-column layouts. Perfect for creating technical presentations with consistent styling.
argument-hint: "slide topic or style theme"
---

# MARP Slide Generation

This skill enables creation and editing of professional presentation slides using MARP, following the Otto Group branded, LOTR-themed style established in this repository's keynote presentation.

## When to Use This Skill

Use this skill when you need to:
- Create new presentation slides in Markdown format
- Add slides to the existing Copilot showcase presentation
- Format technical content with code blocks and syntax highlighting
- Create two-column layouts with images and content
- Apply Otto Group branding and LOTR theming
- Generate slides for technical talks or demos
- Convert documentation into presentation format

## Prerequisites

- MARP CLI tools (via MCP server or npm package)
- Understanding of Markdown syntax
- Otto Group brand assets (logo SVG in slides directory)
- LOTR-themed images for visual interest

## Core Capabilities

### 1. Slide Structure
- YAML frontmatter for configuration
- Markdown-based content authoring
- Speaker notes support
- Slide IDs for version control

### 2. Styling & Branding
- Otto Group color palette (#434098, #40A2AA, #2E1749)
- Custom CSS in frontmatter
- Scoped styles per slide
- Responsive layouts

### 3. Content Types
- Text slides with headings and bullet points
- Code slides with syntax highlighting
- Two-column layouts for image + text
- Full-screen image slides
- Tables and blockquotes

### 4. Export Options
- HTML for web viewing
- PDF for distribution
- PNG images for thumbnails
- Live preview during editing

## Usage Examples

### Example 1: Basic Slide with LOTR Theme
```markdown
---

## The Fellowship of Code Review

### Why Code Review Matters:

- **Catch bugs early** - Like spotting Gollum before he steals the Ring
- **Share knowledge** - One does not simply code alone
- **Maintain quality** - Keep your codebase as pristine as the Shire
- **Build team culture** - Stronger together, like the Fellowship

> *"Even the smallest person can change the course of the future..."*

---
```

### Example 2: Code Slide with Syntax Highlighting
~~~markdown
---

## GitHub Copilot Agent Example

```typescript
// Ask Copilot to generate a data access function
async function getActiveQuests(): Promise<Quest[]> {
  const quests = await db.query<Quest>(
    'SELECT * FROM quests WHERE status = ?',
    ['active']
  )
  return quests
}
```

**Key Features:**
- Auto-completion as you type
- Context-aware suggestions
- Full function generation

---
~~~

### Example 3: Two-Column Layout (Image + Content)
```markdown
--- 

## MCP Servers at Your Service

<div class="columns">
  <div>

  ### **Benefits:**
  - Access external tools and data
  - GitHub, databases, APIs
  - Playwright for browser testing
  - Custom agents with MCP

  </div>

  <div>

  ![MCP Diagram](images/mcp-architecture.png)

  </div>
</div>

---
```

### Example 4: Full-Screen Image Slide
```markdown
---

<style scoped>
section {
  display: flex;
  justify-content: center;
  align-items: center;
}
section img {
  max-width: 100%;
  max-height: 90vh;
  object-fit: contain;
}
</style>

![Live Demo](images/live_demo.jpg)

---
```

## Otto Group Branded Template

Use this as the starting frontmatter for new presentations:

```markdown
---
marp: true
theme: default
paginate: true
header: 'Your Presentation Title'
footer: 'Your Project Name'
style: |
  section {
    background-color: #FFFFFF;
    color: #030303;
    font-size: 22px;
    background-image: url('Otto_Oneo_WBM_Red_pos_RGB.svg');
    background-repeat: no-repeat;
    background-position: top 10px right 10px;
    background-size: 180px;
  }
  h1 {
    color: #434098;
    font-size: 1.8em;
    border-bottom: 3px solid #40A2AA;
    padding-bottom: 0.3em;
  }
  h2 {
    color: #2E1749;
    font-size: 1.3em;
  }
  h3 {
    color: #40A2AA;
  }
  code {
    background: #F9F5ED;
    color: #2E1749;
    font-size: 0.85em;
    padding: 2px 6px;
    border-radius: 3px;
  }
  pre {
    background: #F9F5ED;
    border: 1px solid #434098;
    border-radius: 5px;
    font-size: 0.75em;
  }
  blockquote {
    border-left: 4px solid #40A2AA;
    background: #D5F1F4;
    padding: 10px 20px;
  }
  .columns {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 5rem;
    align-items: center;
  }
---
```

## Guidelines

1. **Use Markdown syntax** - Keep slides simple and readable in source form
2. **Follow Otto Group branding** - Use provided colors and logo placement
3. **Keep LOTR theme consistent** - Use thematic language and references
4. **One idea per slide** - Don't overcrowd with too much information
5. **Use visual hierarchy** - Headings, subheadings, and bullet points
6. **Include speaker notes** - Add notes below slides using HTML comments
7. **Optimize images** - Use compressed images, prefer SVG when possible
8. **Test responsiveness** - Slides should work at different resolutions
9. **Use code sparingly** - Keep code examples short and focused
10. **Add transitions** - Slide separators are `---` (three dashes)

## Common Patterns

### Pattern: Speaker Notes
```markdown
---

## Main Content Here

<!-- 
Speaker notes go here - not visible in presentation
Talk about the Fellowship and their journey
-->

---
```

### Pattern: Scoped Styles (Per-Slide CSS)
```markdown
---

<style scoped>
.warning {
  color: #EB001F;
  font-weight: bold;
}
</style>

<div class="warning">
⚠️ Important: Test your code before deploying!
</div>

---
```

### Pattern: Blockquote with LOTR Quote
```markdown
---

## Final Thoughts

> *"All we have to decide is what to do with the time that is given us..."*
> *So let Copilot do the boring stuff.* 🧙‍♂️

---
```

### Pattern: Title Slide (Lead Class)
```markdown
---

<!-- _class: lead -->

# One Tool to Rule Them All
## GitHub Copilot's Journey

---
```

## MARP MCP Server Commands

If using the MARP MCP server, available commands:
- Generate slides from outline
- Set frontmatter configuration
- Manage individual slides
- List available layouts
- Generate unique slide IDs

## Export and Preview

```bash
# Export to HTML (from repository root)
npm run build:html

# Export to PDF
npm run build:pdf

# Watch mode with live preview
npm run watch

# Or use marp CLI directly
npx @marp-team/marp-cli slides/copilot-showcase.md -o output.html --allow-local-files
```

## Color Palette Reference

Otto Group brand colors used in this presentation:
- **Primary Purple**: `#434098`
- **Accent Cyan**: `#40A2AA`
- **Dark Purple**: `#2E1749`
- **Background**: `#FFFFFF`
- **Text**: `#030303`
- **Code Background**: `#F9F5ED`
- **Error Red**: `#EB001F`
- **Info Blue**: `#D5F1F4`

## Reference Files

- [copilot-showcase.md](../../../slides/copilot-showcase.md) - Main presentation file
- [MARP Official Docs](https://marpit.marp.app/) - MARP documentation
- [Markdown Guide](https://www.markdownguide.org/) - Markdown syntax reference

## Limitations

- Limited animation support (use CSS transitions)
- No native video embedding (use images or links)
- Some advanced PowerPoint features not available
- Export to PDF may have slight style differences
- Complex layouts require custom CSS knowledge
- Browser compatibility varies for advanced features
