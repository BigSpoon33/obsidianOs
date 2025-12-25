---
created: 2025-12-09
tags:
  - academic
  - overview
  - system-docs
---

# 📊 Academic System - Complete Overview

## 🎯 What Is This?

A **complete academic tracking system** for Obsidian that combines:
- **Kepano's philosophy:** Simple, fast, link-heavy note-taking
- **YPNG aesthetics:** Polished dashboards with visual effects
- **Modern tooling:** Dataview, Meta-bind, Bases, CSS

**Everything is self-contained** in the `Academic System/` folder for easy reference and portability.

---

## 📁 System Structure

```
Academic System/
├── 📄 README.md                    # Main documentation
├── 🚀 GETTING STARTED.md           # Quick start guide
├── 📊 SYSTEM OVERVIEW.md           # This file
│
├── 📋 Templates/                   # Note templates
│   ├── Class Template.md           # Course dashboard template
│   └── Coursework Template.md      # Universal coursework template
│
├── 🗂️ Bases/                       # Filtered views
│   ├── Classes.base                # Class filtering and views
│   └── Coursework.base             # Coursework filtering and views
│
├── 📑 Categories/                  # Overview pages
│   ├── Classes.md                  # All classes overview
│   └── Coursework.md               # All coursework overview
│
├── 📚 Documentation/                # Comprehensive plugin docs
│   ├── Plugin - Dataview.md        # Complete Dataview guide
│   └── Plugin - Meta Bind.md       # Complete Meta-bind guide
│
├── 🎨 CSS Snippets/                # Styling
│   ├── academic-core.css           # Essential styles (required)
│   ├── academic-neon.css           # Visual effects (optional)
│   └── examples/                   # CSS examples and variations
│
└── 💡 Examples/                    # Working examples
    ├── Academic Dashboard.md       # Master dashboard template
    ├── Example - CS-101...md       # Example class note
    └── Example - CS-101 Homework... # Example coursework note
```

---

## 🎓 Core Concepts

### Two-Template System

**1. Class Template** → Course Dashboard
- One per course
- Acts as homepage/hub
- Contains quick-action buttons
- Shows upcoming deadlines
- Tracks grades
- Lives in vault root

**2. Coursework Template** → Universal Work Item
- One template for everything
- Differentiated by `type` property
- Types: assignment, exam, project, lab, quiz, notes, reading, essay
- Quick controls for inline editing
- Lives in vault root

---

### Property-Based Organization

**Instead of folders, use properties:**
```yaml
---
categories: [[Classes]]      # Enables base filtering
course-code: CS-101          # Unique identifier
status: active               # Current state
semester: Spring 2025        # Temporal organization
---
```

**Why?**
- ✅ Notes can belong to multiple categories
- ✅ Change organization without moving files
- ✅ Fast searching and filtering
- ✅ Bases create automatic views
- ✅ Portable (just plain text)

---

### Link-Heavy Philosophy

**Everything connects:**
- Coursework → Class (via `class` property)
- Lecture notes → Topics (via inline links)
- Assignments → Related readings
- Classes → Instructors, textbooks, concepts

**Result:** Web of knowledge, not hierarchy of folders

---

## 🔧 Technical Stack

### Plugins Required

| Plugin | Purpose | Status |
|--------|---------|--------|
| **Dataview** | Dashboard widgets, queries | ✅ Essential |
| **Meta Bind** | Inline controls, buttons | ✅ Essential |
| **Bases** (core) | Filtered table views | ✅ Essential |
| **Templater** | Smart creation (optional) | ⭐ Recommended |
| **Banners** | Visual headers | ⭐ Optional |
| **Style Settings** | CSS GUI | ⭐ Optional |

### CSS Layers

**Layer 1: Core** (`academic-core.css`)
- Dashboard grids
- Clean embeds
- Table improvements
- Meta-bind spacing
- **Required**

**Layer 2: Neon** (`academic-neon.css`)
- Glowing effects
- Status badges
- Animated urgency
- Progress bars
- **Optional**

### Configuration

**types.json** (✅ Already updated)
```json
{
  "types": {
    "course-code": "text",
    "due": "date",
    "class": "multitext",
    "status": "multitext",
    // ... and more
  }
}
```

Enables proper:
- Date sorting
- Number filtering
- Link handling
- Multi-value properties

---

## 📊 What You Can Track

### Classes
- Course information (code, name, instructor)
- Semester organization
- Credit hours
- Final grades
- Status (active, completed, dropped)
- Custom notes and reflections

### Coursework
- Assignments, exams, projects
- Due dates with urgency tracking
- Status workflow (not-started → in-progress → completed → submitted → graded)
- Grades (flexible: A+, 95%, 85/100)
- Topics covered
- Work notes and reflections

### Aggregated Views
- Due soon (next 7 days)
- Overdue tracking
- By class
- By type (all exams, all assignments)
- Graded work
- In progress
- Semester overview

### Computed Metrics
- Active class count
- Upcoming deadline count
- Overdue items
- Completion percentage per class
- GPA calculation (letter grades)
- Recent grades
- Total coursework stats

---

## 🎨 Visual Features

### Dashboards
- **Two-column layouts** (desktop)
- **Responsive** (single column on mobile)
- **Neon stat widgets** (active classes, upcoming, overdue)
- **Embedded bases** (filtered tables)
- **DataviewJS widgets** (deadlines, grades, progress)

### Tables (Bases)
- **Sortable columns**
- **Multiple views** (Active, All, By Semester, etc.)
- **Filtered dynamically**
- **Clean embeds** (no borders, no titles)
- **Adjustable column widths**

### Interactive Elements
- **Meta-bind buttons** (create notes, update status)
- **Inline inputs** (edit properties without opening frontmatter)
- **Date pickers** (visual due date selection)
- **Dropdowns** (status, type selection)
- **Toggles** (boolean properties)

### Visual Indicators
- **Urgency colors** (🔴 overdue, 🟡 soon, 🟢 OK)
- **Status badges** (colored, with glow)
- **Progress bars** (neon gradient with shadow)
- **Grade highlighting** (A=green glow, B=blue, etc.)
- **Animated urgency** (pulsing for critical deadlines)

---

## 📖 Documentation Depth

### README.md
- System overview
- Installation steps
- Core concepts
- Quick start
- Troubleshooting
- Customization intro

### GETTING STARTED.md
- 5-minute setup
- First class creation
- First assignment
- Understanding structure
- Customization options
- Success checklist
- Tips and tricks

### Plugin - Dataview.md (16KB, ~4000 words)
- Installation and configuration
- Core concepts (pages, properties, queries)
- All query types (TABLE, LIST, TASK, CALENDAR)
- 5 academic use cases with code
- DQL vs DataviewJS comparison
- Common patterns (filtering, dates, links)
- Performance tips
- Troubleshooting (8 common issues)
- Quick reference

### Plugin - Meta Bind.md (15KB, ~3500 words)
- Installation and configuration
- All input types (text, date, select, slider, etc.)
- Button actions (command, templater, update metadata)
- 7 academic use cases with code
- Advanced patterns (templater integration, conditional inputs)
- Meta Bind + Dataview combination
- Troubleshooting (4 common issues)
- Templates for copy-paste
- Best practices

---

## 💡 Example Workflows

### Daily Check-In
1. Open Academic Dashboard
2. Check "Due Soon" widget
3. Update status on in-progress items
4. Review overdue (if any)

### New Semester Setup
1. Copy Class Template for each course
2. Fill in course info
3. Add syllabi and important dates
4. Link to textbooks/resources

### Assignment Workflow
1. Click "New Assignment" in class note
2. Fill in due date and requirements
3. Status: not-started
4. Work on assignment (status: in-progress)
5. Submit (status: submitted)
6. Receive grade (status: graded, add grade)
7. Write reflection

### Weekly Review
1. Check coursework completion rates per class
2. Review upcoming week's deadlines
3. Identify any overdue items
4. Plan study time
5. Update priorities

### End of Semester
1. Change class status to "completed"
2. Add final grade
3. Review all coursework
4. Write course reflection
5. Archive or keep notes for reference

---

## 🎯 Design Decisions

### Why This Structure?

**Self-Contained Folder:**
- ✅ Easy to reference
- ✅ Doesn't clutter vault root
- ✅ Portable (copy to new vault)
- ✅ Clear separation of system vs content

**Two Templates:**
- ✅ Simpler than many specialized templates
- ✅ `type` property provides differentiation
- ✅ One template to maintain
- ✅ Consistent structure

**Root-Level Notes:**
- ✅ Follows Kepano philosophy
- ✅ Fast access (no folder navigation)
- ✅ Properties provide organization
- ✅ Search-first, not folder-first

**Comprehensive Documentation:**
- ✅ Self-sufficient (no external docs needed)
- ✅ Examples with every concept
- ✅ Copy-paste ready code
- ✅ Troubleshooting included
- ✅ Version tracking

### What We Avoided

**❌ Over-specialized templates**
- Too many templates = maintenance burden
- Universal template with `type` property is simpler

**❌ Nested folders**
- Breaks Kepano philosophy
- Limits flexibility
- Properties are better

**❌ Complex automation**
- Keep it simple
- Manual is okay if it's fast
- Automation only where high value

**❌ Plugin dependencies**
- Core system works with just Bases
- Dataview/Meta-bind are enhancements
- CSS is purely visual

**❌ Prescriptive workflows**
- Show patterns, not rules
- Customize to your style
- Examples, not mandates

---

## 🚀 Getting Started Path

### Total Setup Time: ~15 minutes

1. **5 min:** Install plugins, enable CSS (GETTING STARTED.md)
2. **5 min:** Create first class and assignment
3. **3 min:** Check bases and dashboard work
4. **2 min:** Read through examples

### Learning Curve

**Week 1:** Basic usage
- Create classes
- Track assignments
- Use status updates
- Check due dates

**Week 2:** Power features
- Customize dashboard
- Use inline inputs
- Explore base views
- Adjust CSS

**Week 3:** Advanced
- Modify templates
- Create custom widgets
- Build custom views
- Optimize workflow

**Month 1:** Mastery
- System is second nature
- Customized to your needs
- Fast and efficient
- Minimal friction

---

## 📊 System Metrics

### Files Created: 15

- 2 Templates
- 2 Bases
- 2 Category pages
- 2 Plugin documentation
- 2 CSS files
- 3 Example notes
- 3 System documentation files

### Documentation Words: ~10,000

- README: 2,500 words
- GETTING STARTED: 2,000 words
- Plugin - Dataview: 4,000 words
- Plugin - Meta Bind: 3,500 words
- Examples: 1,500 words

### Code Examples: 50+

- Dataview queries
- DataviewJS widgets
- Meta-bind inputs
- Meta-bind buttons
- CSS snippets
- Base configurations

---

## 🎨 Customization Potential

### Easy Customizations

**Add sections to templates:**
```markdown
## 🤝 Study Group
## 📖 Textbook Notes
## 💻 Code Examples
```

**Add properties:**
```yaml
difficulty: hard
estimated-hours: 5
collaboration-allowed: true
```

**Change colors in CSS:**
```css
--urgent-color: #ff0000;
--warning-color: #ffa500;
--ok-color: #00ff00;
```

**Add base views:**
```yaml
- type: table
  name: High Priority
  filters:
    and:
      - priority = "high"
```

### Advanced Customizations

**Custom DataviewJS widgets:**
- Study time tracker
- Grade distribution charts
- Semester GPA trends
- Subject difficulty ratings

**Custom meta-bind actions:**
- Archive semester button
- Bulk status update
- Auto-schedule study time
- Export to calendar

**Custom CSS classes:**
- Subject-specific themes
- Semester color coding
- Difficulty-based styling
- Priority highlighting

**Integration with other systems:**
- Google Calendar sync
- Canvas LMS import
- Grade calculation tools
- Study timer apps

---

## 🔮 Future Enhancements

### Potential Additions (Not Included Yet)

**Documentation:**
- [ ] Plugin - Templater.md
- [ ] Plugin - Bases.md (core plugin guide)
- [ ] Workflows.md (detailed workflow patterns)
- [ ] CSS Guide.md (comprehensive styling options)

**Templates:**
- [ ] Semester planning template
- [ ] Study session template
- [ ] Exam prep template
- [ ] Research paper template

**Features:**
- [ ] Study time tracking
- [ ] Pomodoro integration
- [ ] Flashcard generation
- [ ] Bibliography management

**CSS:**
- [ ] Subject-specific themes
- [ ] Dark/light mode variants
- [ ] Print stylesheet
- [ ] Mobile optimizations

---

## ✅ What's Included (Complete)

### Core System
- ✅ Two comprehensive templates
- ✅ Two complete bases (11 views)
- ✅ Two category pages
- ✅ Master dashboard example
- ✅ Academic property types (types.json updated)

### Documentation
- ✅ README with full system overview
- ✅ GETTING STARTED quick start guide
- ✅ Plugin - Dataview (comprehensive, 16KB)
- ✅ Plugin - Meta Bind (comprehensive, 15KB)
- ✅ This SYSTEM OVERVIEW

### Styling
- ✅ academic-core.css (required, production-ready)
- ✅ academic-neon.css (optional, full effects)
- ✅ Responsive layouts
- ✅ Theme compatibility
- ✅ Accessibility considerations

### Examples
- ✅ Complete class note (CS-101)
- ✅ Complete assignment note (Homework 1)
- ✅ Master academic dashboard
- ✅ All examples fully functional

---

## 🎓 Success Criteria

You'll know the system is working when:

- ✅ You can create a class in under 1 minute
- ✅ Adding assignments feels effortless
- ✅ You check "Due Soon" daily by habit
- ✅ Status updates are second nature
- ✅ Finding old notes is instant
- ✅ The system adapts to your needs
- ✅ You spend more time learning, less time organizing

---

## 🌟 Philosophy Summary

This system embodies:

**Kepano's Principles:**
- Simple file structure
- Fast note creation
- Heavy linking
- Property-based organization
- Search > folders
- Plain text forever

**Modern Enhancements:**
- Visual dashboards
- Interactive controls
- Dynamic filtering
- Computed metrics
- Aesthetic polish
- Power user features

**Result:**
A system that's both **simple enough for day one** and **powerful enough for year four**.

---

## 📬 System Meta

**Version:** 1.0  
**Created:** 2025-12-09  
**License:** Free for personal use  
**Credits:** 
- Kepano's vault structure and philosophy
- YPNG vault dashboard patterns
- Obsidian plugin developers

**Repository:** Self-contained in `Academic System/` folder

---

*Everything you need is in this folder. Start with GETTING STARTED.md* 🚀
