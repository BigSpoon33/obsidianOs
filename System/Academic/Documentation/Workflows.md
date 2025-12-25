---
created: 2025-12-09
tags:
  - documentation
  - workflows
---

# 🔄 Academic System Workflows

Complete workflow patterns for common academic tasks.

---

## 📚 Table of Contents

1. [Semester Setup](#semester-setup)
2. [Daily Check-In](#daily-check-in)
3. [Assignment Workflow](#assignment-workflow)
4. [Exam Preparation](#exam-preparation)
5. [Grade Recording](#grade-recording)
6. [Weekly Review](#weekly-review)
7. [End of Semester](#end-of-semester)

---

## Semester Setup

### When: Start of each semester

**Goal:** Set up all your classes for organized tracking

### Steps

**1. Create Class Notes**

For each course:
```
1. Copy: Academic System/Templates/Class Template.md
2. Paste to vault root
3. Rename: [CODE] [Name].md
   Example: CS-101 Introduction to Python.md
```

**2. Fill in Course Information**

Using inline inputs in the Course Information callout:

```
Course Code: CS-101
Course Name: Introduction to Python
Instructor: Dr. Sarah Johnson
Semester: Spring 2025
Credits: 3
Status: active
```

The heading updates automatically as you type! ✨

**3. Add Important Dates**

Scroll to "Important Dates" section:
```markdown
- **Midterm:** March 15, 2025
- **Final:** May 10, 2025
- **Project Due:** May 5, 2025
```

**4. Link Resources**

Add syllabus, textbook, course website:
```markdown
### Resources
- Course website: https://...
- Textbook: [[Python Crash Course]]
- Office hours: Tuesdays 2-4pm
```

**5. Verify Dashboard**

Check that:
- Upcoming Deadlines widget shows "No upcoming deadlines"
- Grade Tracker shows "No graded work yet"
- All Coursework section is empty

**Time Required:** ~5 minutes per class

---

## Daily Check-In

### When: Every morning or before studying

**Goal:** See what's due soon and update progress

### Steps

**1. Open Academic Dashboard**

Navigate to: `Academic Dashboard.md` (in vault root)

**2. Check Stats Widget**

Quick glance at:
- Active Classes count
- Due This Week count
- Overdue count (should be 0! 🎯)

**3. Review This Week's Deadlines**

Scroll to "This Week's Deadlines" section

**What to look for:**
- 🔴 Items marked "TODAY" or "TOMORROW"
- Items you need to start working on
- Anything you forgot about

**4. Update Statuses**

For items you're working on:
```
1. Click into the note
2. Find Quick Controls callout
3. Click Status dropdown
4. Change: not-started → in-progress
```

**5. Check Overdue Section**

If anything appears here:
- Review what's overdue
- Update status if completed
- Make a plan to finish ASAP

**Time Required:** ~2 minutes

---

## Assignment Workflow

### When: New assignment is given

**Goal:** Create and track assignment from start to finish

### Steps

**1. Create Assignment Note**

From your class note:
```
1. Open: CS-101 Introduction to Python.md
2. Click: "New Assignment" button
3. Popup appears: "Rename to: CS-101 Assignment?"
4. Choose: Second option (with course code)
5. File created: CS-101 Assignment.md
```

**Auto-filled properties:**
- ✅ class: [[CS-101 Introduction to Python]]
- ✅ type: assignment
- ✅ status: not-started

**2. Add Assignment Details**

Using Quick Controls:
```
Assigned: [Click date picker]
Due: [Click date picker]
```

**3. Fill in Description**

Scroll to Description section:
```markdown
## 📝 Description

Write a Python program that:
- Takes user input
- Calculates factorial
- Displays result

Requirements:
- Use functions
- Include error handling
- Add comments
```

**4. Track Requirements**

Use checklist:
```markdown
## 📋 Requirements

- [ ] Create main function
- [ ] Add input validation
- [ ] Implement factorial logic
- [ ] Test with multiple inputs
- [ ] Add documentation
```

**5. Work on Assignment**

Update status as you progress:
```
not-started → in-progress → completed → submitted
```

Use the status dropdown in Quick Controls!

**6. Record Grade**

When graded:
```
Status: graded
Grade: A (or 95%, or 85/100)
```

**7. Write Reflection**

Scroll to Reflection section:
```markdown
## 💡 Reflection

**What went well:**
- Function structure made code clean
- Error handling caught edge cases

**Challenges:**
- Initially forgot about 0! = 1 case
- Spent time debugging recursion depth

**For next time:**
- Start earlier to avoid rush
- Test edge cases first
```

**Time Investment:**
- Setup: 2 minutes
- During work: Update status (5 seconds)
- After grading: Reflection (5 minutes)

---

## Exam Preparation

### When: Exam announced or 1-2 weeks before exam

**Goal:** Organize study materials and track preparation

### Steps

**1. Create Exam Note**

```
1. Open class note
2. Click: "New Exam" button
3. Rename: CS-101 Midterm Exam
```

**Auto-filled:**
- ✅ class: [[CS-101 Introduction to Python]]
- ✅ type: exam ← Auto-detected from "Exam" in name!

**2. Set Exam Date**

```
Due: [Exam date]
```

**3. List Topics to Study**

```markdown
## 🎯 Learning Objectives

- [ ] Variables and data types
- [ ] Control flow (if/else, loops)
- [ ] Functions
- [ ] Lists and dictionaries
- [ ] File I/O
```

**4. Link Study Materials**

```markdown
## 📚 Resources

Related lecture notes:
- [[2025-01-17 CS-101 Variables Lecture]]
- [[2025-01-24 CS-101 Control Flow Lecture]]
- [[2025-02-05 CS-101 Functions Lecture]]

Assignments for review:
- [[CS-101 Homework 1 Variables]]
- [[CS-101 Homework 2 Loops]]

Practice:
- Textbook Chapter 1-5 exercises
- [[CS-101 Practice Problems]]
```

**5. Track Study Sessions**

In Notes & Work section:

```markdown
## ✍️ Notes & Work

### Study Session 1 (March 10)
- Reviewed variables and data types
- Practiced string manipulation
- Completed practice problems 1-10

### Study Session 2 (March 12)
- Focused on control flow
- Did nested loop exercises
- **Need more practice:** Recursion

### Study Session 3 (March 14)
- Functions review
- Completed mock exam
- Score: 85% (target: 90%+)
```

**6. After Exam**

```
Status: completed → graded
Grade: A
```

Write reflection:
```markdown
## 💡 Reflection

**What was covered:**
- Heavy emphasis on functions
- Tricky recursion problem
- String manipulation

**What helped:**
- Practice problems from textbook
- Reviewing homework solutions
- Mock exam practice

**Next time:**
- More recursion practice
- Time management (finished early)
```

---

## Grade Recording

### When: Receive any grade

**Goal:** Keep accurate grade records and track performance

### Steps

**1. Open Assignment/Exam Note**

Navigate to the graded work item

**2. Update Status**

Quick Controls:
```
Status: submitted → graded
```

**3. Record Grade**

Quick Controls:
```
Grade: [Enter grade]
```

**Formats accepted:**
- Letter: `A`, `B+`, `C-`
- Percentage: `95%`, `87.5%`
- Points: `85/100`, `43/50`

**4. Check Class Dashboard**

Open class note to see:
- Grade appears in Grade Tracker table
- GPA calculation updates (if using letter grades)

**5. Update Academic Dashboard**

Recent Grades section automatically updates!

**6. Analyze Performance**

If grade is lower than expected:
- Write detailed reflection
- Identify what went wrong
- Make plan for improvement
- Note topics to review

**Time Required:** ~1 minute

---

## Weekly Review

### When: End of each week (Sunday evening or Friday afternoon)

**Goal:** Stay on top of work and plan ahead

### Steps

**1. Check Academic Dashboard**

Review:
- How many items due next week?
- Any overdue items? (Fix this!)
- Progress on in-progress items

**2. Review Each Class**

Open each class note, check:
- Upcoming Deadlines widget
- Any surprises?
- Status of current work

**3. Update All Statuses**

Go through coursework:

**Started this week:**
```
not-started → in-progress
```

**Finished this week:**
```
in-progress → completed → submitted
```

**Received grades:**
```
submitted → graded
[Add grade]
```

**4. Plan Next Week**

Look at Due Soon view:
- What's due next week?
- When will you work on each item?
- Any that need early start?

**5. Archive Completed Work** (Optional)

For completed semesters:
```
Class status: active → completed
Add final grade
```

**Time Required:** ~10 minutes

---

## End of Semester

### When: After final grades are posted

**Goal:** Archive semester and prepare for next term

### Steps

**1. Update All Final Grades**

For each class:
```
1. Open class note
2. Quick Controls → Final Grade: [enter grade]
3. Status: active → completed
```

**2. Complete Final Reflections**

In each class note:

```markdown
## 💭 Notes & Reflections

### Semester Summary (Spring 2025)

**Final Grade:** A (4.0)

**Overall Experience:**
- Excellent instructor, clear explanations
- Projects were challenging but rewarding
- Workload was manageable

**Key Takeaways:**
- Mastered Python fundamentals
- Learned to debug effectively
- Gained confidence in programming

**Skills Gained:**
- Python programming
- Problem-solving
- Code organization
- Testing and debugging

**Would recommend to:** Students interested in CS
**Difficulty:** 7/10
**Workload:** 8/10
**Enjoyment:** 9/10
```

**3. Archive or Organize**

**Option A: Keep in Root** (Recommended)
- Status = "completed" filters them out of active views
- Easy to reference later
- Search still finds everything

**Option B: Move to Archive Folder**
```
Create: Archive/Spring 2025/
Move completed class notes and coursework
```

**4. Calculate Semester GPA**

Create note: `Spring 2025 Summary.md`

```markdown
# Spring 2025 Semester Summary

## Courses

| Course | Grade | Credits | Points |
|--------|-------|---------|--------|
| CS-101 | A     | 3       | 12.0   |
| MATH-202 | B+  | 3       | 9.9    |
| ENG-101 | A-   | 3       | 11.1   |

**Semester GPA:** 3.67

## Statistics
- Total Credits: 9
- Classes Completed: 3
- Assignments: 24
- Exams: 6
- Projects: 3
```

**5. Prepare for Next Semester**

- Review what worked this semester
- Adjust templates if needed
- Plan schedule for next term
- Celebrate! 🎉

**Time Required:** ~30 minutes

---

## Quick Reference

### Common Tasks

**Create new class:**
```
1. Copy Class Template
2. Rename with course code
3. Fill in properties
```

**Create assignment:**
```
1. Open class note
2. Click "New Assignment"
3. Choose rename option
4. Fill in due date
```

**Update status:**
```
1. Open note
2. Quick Controls → Status dropdown
3. Select new status
```

**Record grade:**
```
1. Update status to "graded"
2. Quick Controls → Grade field
3. Enter grade
```

**Check deadlines:**
```
1. Open Academic Dashboard
2. View "This Week" section
3. Check overdue section
```

---

## Tips for Success

### 1. Stay Consistent
- Check dashboard daily
- Update statuses immediately
- Record grades as received

### 2. Link Everything
- Link assignments to lectures
- Link concepts between classes
- Link readings to coursework

### 3. Use Quick Controls
- Faster than editing frontmatter
- Updates propagate instantly
- No syntax errors

### 4. Write Reflections
- Learn from each assignment
- Track what works/doesn't
- Build better study habits

### 5. Review Weekly
- Catch things before they're overdue
- Plan ahead
- Stay organized

---

## Workflow Variations

### For Different Learning Styles

**Visual Learners:**
- Use banners on class notes
- Add screenshots to assignments
- Use calendar view extensively

**Detail-Oriented:**
- Expand requirements checklists
- Track study hours
- Record detailed reflections

**Minimalists:**
- Skip optional sections
- Use basic template
- Focus on due dates and grades

**Power Users:**
- Add custom widgets
- Create semester dashboards
- Build study time trackers

---

## Related Documentation

- [[GETTING STARTED]] - First-time setup
- [[QUICK START - BUTTONS]] - Button usage
- [[Smart Templates Guide]] - Auto-linking details
- [[Plugin - Dataview]] - Custom widgets
- [[Plugin - Meta Bind]] - Quick Controls

---

*Updated: 2025-12-09*
