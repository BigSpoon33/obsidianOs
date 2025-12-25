---
created: {{date}}
tags:
  - note
  - journal
  - techtut
---
To add new SVG icons to this snippet, you need to modify the **Style Settings** block at the very bottom of the file.

Specifically, you need to find the `extras-hr-image` section and add new items to the `options` list. The icons must be **URL Encoded SVGs**.

Here is how to do it, along with some ready-to-use icons.

### 1. Where to edit

Scroll down to the bottom of your CSS file. Look for this section:

YAML

```
  -
    id: extras-hr-image
    title: Icon Image
    ...
    options:
      -
        label: Obsidian
        value: url('...')
      -
        label: Microchip
        value: url('...')
      /* INSERT NEW ICONS HERE */
```

### 2. Ready-to-use Code Block

Here is the updated `options` section with 3 new icons (Star, Heart, and Lightning) added to your existing list.

Replace the **entire** `options:` list under `id: extras-hr-image` with this:

YAML

```
    options:
      -
        label: Obsidian
        value: url('data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="18" height="18" fill="none" stroke="currentColor" stroke-width="32" stroke-linecap="round" stroke-linejoin="round" %3E%3Cpath d="M172.7 461.6c73.6-149.1 2.1-217-43.7-246.9m72 96.7c71.6-17.3 141-16.3 189.8 88.5m-114-96.3c-69.6-174 44.6-181 16.3-273.6m97.7 370c1.6-3 3.3-5.8 5.1-8.6 20-29.9 34.2-53.2 41.4-65.3a16 16 0 0 0-1.2-17.7 342.1 342.1 0 0 1-40.2-66.1c-10.9-26-12.5-66.5-12.6-86.2 0-7.4-2.4-14.7-7-20.6l-81.8-104a32 32 0 0 0-1.4-1.5m97.7 370a172.8 172.8 0 0 0-18 59c-2.9 21.5-24 38.4-45 32.6-30-8.3-64.5-21.1-95.7-23.5l-47.8-3.6c-7.7-.6-15-4-20.3-9.5l-82.3-84.8c-9-9.2-11.4-23-6.2-34.8l52.8-117.7.7-3M293.1 30a31.5 31.5 0 0 0-44.4-2.3l-97.4 87.5c-5.4 5-9 11.5-10 18.8L129 214.7"/%3E%3C/svg%3E')
      -
        label: Microchip
        value: url('data:image/svg+xml,%3Csvg width="500" height="500" viewBox="0 0 500 500" id="svg1" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:svg="http://www.w3.org/2000/svg"%3E%3Cg id="icon" transform="translate(-141,-166)"%3E%3Cpath id="ic" style="fill:none;stroke:%238a8d8f;stroke-width:30;stroke-linecap:round;stroke-linejoin:round;stroke-opacity:1" d="m 361,576 M 181,536 h 90 m -90,-80 h 90 m -90,-80 h 90 m -90,-80 h 90 m 240,0 h 90 m -90,80 h 90 m -90,80 h 90 m -90,80 h 90 M 271,256 H 511 V 576 H 271 Z"/%3E%3C/g%3E%3C/svg%3E')
      -
        label: Star
        value: url('data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"%3E%3Cpolygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/%3E%3C/svg%3E')
      -
        label: Heart
        value: url('data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"%3E%3Cpath d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/%3E%3C/svg%3E')
      -
        label: Lightning
        value: url('data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"%3E%3Cpolygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/%3E%3C/svg%3E')
```

### 3. How to create your own

If you want to use a custom icon (for example from [Lucide Icons](https://lucide.dev/icons/)), follow these steps:

1. **Get the SVG Code:** Copy the code for the icon.
    
2. **Edit Color:** Ensure the SVG code has `stroke="currentColor"` or `fill="currentColor"` (instead of a specific hex code like `#000000`). This ensures the icon changes color when you adjust the horizontal rule color in settings.
    
3. **Encode it:** You cannot paste raw HTML/SVG into the CSS file; it will break. You must URL Encode it.
    
    - Go to a site like [Encoder](https://www.urlencoder.org/).
        
    - Paste your SVG code.
        
    - Click Encode.
        
4. **Format the string:**
    
    - Wrap the result in: `url('data:image/svg+xml,PAST_CODE_HERE')`
        
5. **Add to CSS:** Add it to the list as shown in step 2.




---
