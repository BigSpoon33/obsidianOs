<%*
// ============================================
// SMART COURSEWORK TEMPLATE
// Auto-detects parent class and pre-fills properties
// ============================================

// Try to detect the parent class from:
// 1. File name (e.g., "CS-101 Assignment")
// 2. Last opened file (if it's a class)
// 3. User selection (fallback)

let detectedClass = "";
let detectedCourseCode = "";
let assignmentType = "assignment";

// Extract course code from filename
const fileName = tp.file.title;
const courseCodeMatch = fileName.match(/^([A-Z]+-\d+)/);

if (courseCodeMatch) {
  detectedCourseCode = courseCodeMatch[1];
  
  // Find the class note with this course code
  const classFiles = app.vault.getMarkdownFiles()
    .filter(f => {
      const cache = app.metadataCache.getFileCache(f);
      return cache?.frontmatter?.["course-code"] === detectedCourseCode;
    });
  
  if (classFiles.length > 0) {
    detectedClass = `[[${classFiles[0].basename}]]`;
  }
}

// If we couldn't detect from filename, check recently opened files
if (!detectedClass) {
  const recentFiles = app.workspace.getLastOpenFiles();
  
  for (const filePath of recentFiles) {
    const file = app.vault.getAbstractFileByPath(filePath);
    if (file && file.extension === "md") {
      const cache = app.metadataCache.getFileCache(file);
      const categories = cache?.frontmatter?.categories;
      
      if (categories && String(categories).includes("Classes")) {
        detectedClass = `[[${file.basename}]]`;
        detectedCourseCode = cache.frontmatter["course-code"] || "";
        break;
      }
    }
  }
}

// If still no class detected, ask user
if (!detectedClass) {
  const allClasses = app.vault.getMarkdownFiles()
    .filter(f => {
      const cache = app.metadataCache.getFileCache(f);
      const categories = cache?.frontmatter?.categories;
      return categories && String(categories).includes("Classes");
    })
    .map(f => f.basename);
  
  if (allClasses.length > 0) {
    const selected = await tp.system.suggester(
      allClasses,
      allClasses,
      false,
      "Which class is this for?"
    );
    
    if (selected) {
      detectedClass = `[[${selected}]]`;
      
      // Get course code from selected class
      const classFile = app.vault.getMarkdownFiles().find(f => f.basename === selected);
      if (classFile) {
        const cache = app.metadataCache.getFileCache(classFile);
        detectedCourseCode = cache?.frontmatter?.["course-code"] || "";
      }
    }
  }
}

// Detect assignment type from filename
if (fileName.toLowerCase().includes("exam") || fileName.toLowerCase().includes("test")) {
  assignmentType = "exam";
} else if (fileName.toLowerCase().includes("project")) {
  assignmentType = "project";
} else if (fileName.toLowerCase().includes("lab")) {
  assignmentType = "lab";
} else if (fileName.toLowerCase().includes("quiz")) {
  assignmentType = "quiz";
} else if (fileName.toLowerCase().includes("homework") || fileName.toLowerCase().includes("hw")) {
  assignmentType = "assignment";
} else if (fileName.toLowerCase().includes("lecture") || fileName.toLowerCase().includes("notes")) {
  assignmentType = "notes";
}

// Get title (remove course code prefix if present)
let title = fileName;
if (detectedCourseCode && fileName.startsWith(detectedCourseCode)) {
  title = fileName.substring(detectedCourseCode.length).trim();
}

// 4. SET DATE DEFAULTS 
const createdDate = tp.date.now("YYYY-MM-DD"); const defaultDue = tp.date.now("YYYY-MM-DD", 7); 
// Default due in 1 week 
_%>
---
tags: 
  - task 
  - <% assignmentType %> 
status: todo 
priority: normal 
due: <% defaultDue %> 
created: <% createdDate %> 
related_projects: ["<% detectedClass %>"]
categories:
  - "[[Coursework]]"
class:
  - "<% detectedClass || '[[]]' %>"
type:
  - <% assignmentType %>
title: <% title %>
assigned: 
grade: 
topics: []
---

# <% title %>

> [!info] Quick Controls
> **Class:** `INPUT[text:class]`
> **Type:** `INPUT[inlineSelect(option(assignment), option(exam), option(project), option(notes), option(lab), option(quiz), option(reading), option(essay), option(presentation)):type]`
> **Assigned:** `INPUT[date:assigned]`
> **Due:** `INPUT[date:due]`
> **Status:** `INPUT[inlineSelect(option(todo), option(in-progress), option(waiting), option(done)):status]` 
> **Priority:** `INPUT[inlineSelect(option(high), option(normal), option(low)):priority]`
> **Grade:** `INPUT[text:grade]`

---

## 📝 Description

<!-- What is this assignment about? What are the requirements? -->

<% tp.file.cursor() %>

---

## 📋 Requirements

- [ ] 
- [ ] 
- [ ] 

---

## 🎯 Learning Objectives

<!-- What will you learn from this? What topics does it cover? -->



---

## ✍️ Notes & Work

<!-- Your work, research, answers, etc. -->



---

## 📚 Resources

<!-- Links to relevant course materials, readings, notes -->

- <% detectedClass %>
- 

---

## 💡 Reflection

<!-- After completion: What did you learn? What would you do differently? -->
