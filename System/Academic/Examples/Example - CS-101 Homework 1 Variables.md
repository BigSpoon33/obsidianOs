---
categories:
  - "[[Coursework]]"
class:
  - "[[Example - CS-101 Intro to Python]]"
type:
  - assignment
title: Homework 1 - Variables and Data Types
assigned: 2025-01-17
due: 2025-12-10
status: in-progress
grade: ""
topics:
  - "[[Variables]]"
  - "[[Data Types]]"
  - "[[Python]]"
---

# Homework 1 - Variables and Data Types

> [!info] Quick Controls
> **Class:** `INPUT[text:class]`
> **Type:** `INPUT[inlineSelect(option(assignment), option(exam), option(project), option(notes), option(lab), option(quiz), option(reading), option(essay), option(presentation)):type]`
> **Assigned:** `INPUT[date:assigned]`
> **Due:** `INPUT[date:due]`
> **Status:** `INPUT[inlineSelect(option(not-started), option(in-progress), option(completed), option(submitted), option(graded)):status]`
> **Grade:** `INPUT[text:grade]`

---

## 📝 Description

First homework assignment covering variables, data types, and basic operations in Python. Write programs demonstrating understanding of:

1. Variable assignment and naming conventions
2. Different data types (int, float, str, bool)
3. Type conversion
4. Basic arithmetic operations
5. String manipulation

---

## 📋 Requirements

- [x] Problem 1: Variable assignment
- [x] Problem 2: Arithmetic operations
- [x] Problem 3: String concatenation
- [x] Problem 4: Type conversion
- [x] Problem 5: Calculator program

---

## 🎯 Learning Objectives

- Understand Python variable naming conventions
- Work with different data types
- Perform type conversions
- Use string formatting
- Debug simple type errors

---

## ✍️ Notes & Work

### Problem 1: Variable Assignment
```python
# Create variables for name, age, and city
name = "Alex"
age = 20
city = "Boston"
is_student = True

print(f"My name is {name}, I am {age} years old, and I live in {city}.")
```

### Problem 2: Arithmetic Operations
```python
# Calculate area and perimeter of rectangle
length = 10
width = 5

area = length * width
perimeter = 2 * (length + width)

print(f"Area: {area}")
print(f"Perimeter: {perimeter}")
```

### Problem 3: String Concatenation
```python
first_name = "Jane"
last_name = "Doe"
full_name = first_name + " " + last_name

print(f"Full name: {full_name}")
print(f"Initials: {first_name[0]}.{last_name[0]}.")
```

### Problem 4: Type Conversion
```python
# Convert between types
num_str = "42"
num_int = int(num_str)
num_float = float(num_str)

print(f"String: {num_str} (type: {type(num_str)})")
print(f"Integer: {num_int} (type: {type(num_int)})")
print(f"Float: {num_float} (type: {type(num_float)})")
```

### Problem 5: Simple Calculator
```python
# Get two numbers from user and perform operations
num1 = float(input("Enter first number: "))
num2 = float(input("Enter second number: "))

print(f"Sum: {num1 + num2}")
print(f"Difference: {num1 - num2}")
print(f"Product: {num1 * num2}")
print(f"Quotient: {num1 / num2}")
```

---

## 📚 Resources

- [[CS-101 Introduction to Python Programming]] - Main class page
- Course textbook: Chapter 2 (Variables and Simple Data Types)
- Python documentation: https://docs.python.org/3/tutorial/introduction.html
- [[2025-01-17 CS-101 Variables Lecture]] - Lecture notes

---

## 💡 Reflection

This assignment was straightforward but helped reinforce the basics. Key takeaways:

**What went well:**
- Variable naming makes sense once you follow the conventions
- Type conversion is simpler than I expected
- String formatting with f-strings is very clean

**Challenges:**
- Almost forgot that division always returns a float, even for whole numbers
- Had to look up the difference between `/` and `//` operators

**For next time:**
- Practice more with string methods (`.upper()`, `.lower()`, `.strip()`)
- Review integer division and modulo operators

**Grade feedback from instructor:**
"Excellent work! Clean code with good variable names. Consider adding comments for clarity in future assignments."

✨ Final Grade: **A** - 100/100 points
