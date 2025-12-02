# 🧪 Chamber Testing Checklist - Kiroween 2025

## 🎯 Pre-Testing Setup

1. **Start Dev Server**
   ```bash
   npm run dev
   ```
   - Should start on http://localhost:3000 (or 3001/3002)
   - Wait for "Ready" message

2. **Open Browser**
   - Chrome/Firefox recommended
   - Open DevTools (F12) to check for errors

---

## 🏠 HOME PAGE TEST

**URL**: `http://localhost:3000/`

### Visual Checks:
- [ ] Floating emojis visible (💀👻🕷️🦇⚰️)
- [ ] Title "Legacy Resurrection Studio" has spooky glow
- [ ] "Ultimate Edition" flickers
- [ ] Sparkles icon animates
- [ ] "Start Analysis" button has heartbeat pulse

### Interaction Checks:
- [ ] Hover over main title → glitch effect appears
- [ ] Hover over chamber cards → cards lift up
- [ ] Hover over chamber icons → icons rotate
- [ ] Click "Start Analysis" → goes to /reanimator
- [ ] Click "Explore Chambers" → scrolls to chambers
- [ ] Click each chamber card → navigates correctly

### Footer Checks:
- [ ] Shows "Kiroween Hackathon 2025"
- [ ] 4 buttons visible: Live Demo, GitHub, Devpost, Docs
- [ ] All links work (open in new tab)

---

## 🧟 CHAMBER 1: LEGACY REANIMATOR

**URL**: `http://localhost:3000/reanimator`

### Visual Checks:
- [ ] Floating emojis visible
- [ ] "Legacy Reanimator" title has glitch effect
- [ ] Subtitle flickers
- [ ] Activity icon rotates
- [ ] Input card has eerie glow
- [ ] "Analyze Code" button has heartbeat

### Functional Test:

**Step 1: Load Sample**
- [ ] Click "Load Sample" button
- [ ] PHP code appears in textarea
- [ ] Code is readable

**Step 2: Analyze**
- [ ] Click "Analyze Code" button
- [ ] Loading spinner appears with message
- [ ] Results appear after ~2-3 seconds

**Step 3: Verify Results**
- [ ] Risk score shows (should be HIGH or CRITICAL)
- [ ] Patterns detected (SQL injection, XSS, etc.)
- [ ] Resurrection routes shown
- [ ] Recommendations visible

**Step 4: Download**
- [ ] Click "Download Report" button
- [ ] Markdown file downloads
- [ ] File opens and is readable

### Error Handling:
- [ ] Click "Analyze Code" with empty textarea → error message
- [ ] Error message is readable

---

## ⚡ CHAMBER 2: API NECROMANCER

**URL**: `http://localhost:3000/api-necromancer`

### Visual Checks:
- [ ] Floating emojis visible
- [ ] "API Necromancer" title has glitch effect
- [ ] Subtitle flickers
- [ ] Zap icon rotates
- [ ] Input card has eerie glow
- [ ] "Convert to REST" button has heartbeat

### Functional Test:

**Step 1: Load Sample**
- [ ] Click "Load Sample" button
- [ ] WSDL XML appears in textarea
- [ ] XML is readable

**Step 2: Convert**
- [ ] Click "Convert to REST" button
- [ ] Loading spinner appears
- [ ] Results appear after ~2-3 seconds

**Step 3: Verify Results**
- [ ] Operations list shows (6 operations)
- [ ] Each operation has:
  - Name (GetCustomer, CreateAccount, etc.)
  - HTTP method (GET, POST, etc.)
  - REST path (/customers/{id}, etc.)
- [ ] OpenAPI spec visible
- [ ] Migration plan shows 4 phases

**Step 4: Download**
- [ ] Click "Download OpenAPI" → JSON file downloads
- [ ] Click "Download Report" → Markdown file downloads
- [ ] Both files are readable

### Error Handling:
- [ ] Click "Convert" with empty textarea → error message
- [ ] Paste invalid XML → error message

---

## 👻 CHAMBER 3: GHOST UI CONVERTER

**URL**: `http://localhost:3000/ghost-ui`

### Visual Checks:
- [ ] Floating emojis visible
- [ ] "Ghost UI Converter" title has glitch effect
- [ ] Subtitle flickers
- [ ] LayoutTemplate icon rotates
- [ ] "Convert to React" button has heartbeat

### Functional Test:

**Step 1: Load Sample**
- [ ] Click "Load Sample" button
- [ ] Bootstrap HTML appears in textarea
- [ ] HTML is readable

**Step 2: Convert**
- [ ] Click "Convert to React" button
- [ ] Loading spinner appears
- [ ] Results appear after ~2-3 seconds

**Step 3: Verify Results**
- [ ] React component code visible
- [ ] Code has:
  - `import { useState } from "react"`
  - `import { Ghost } from "lucide-react"`
  - Spooky container div
  - No jQuery ($)
  - No Bootstrap classes
  - Tailwind CSS classes
- [ ] Migration notes visible
- [ ] Warnings visible
- [ ] Security issues listed

**Step 4: Download**
- [ ] Click "Download Component" → .tsx file downloads
- [ ] Click "Download Report" → Markdown file downloads
- [ ] Both files are readable

### Error Handling:
- [ ] Click "Convert" with empty textarea → error message

---

## 📚 DOCUMENTATION PAGE

**URL**: `http://localhost:3000/docs`

### Visual Checks:
- [ ] Floating emojis visible
- [ ] Title has glitch effect
- [ ] All sections visible:
  - Overview
  - Chambers
  - Architecture
  - Kiro Usage
  - Useful Links

### Interaction Checks:
- [ ] Click chamber cards → navigate to chambers
- [ ] Click external links → open in new tab
- [ ] "Back to Home" button works

---

## 🔍 CONSOLE ERROR CHECK

**Open Browser DevTools (F12) → Console Tab**

### Check for Errors:
- [ ] No red errors in console
- [ ] No 404 errors
- [ ] No TypeScript errors
- [ ] No React warnings (or only minor ones)

### Network Tab:
- [ ] All API calls return 200 OK
- [ ] No failed requests
- [ ] Response times < 5 seconds

---

## 📱 MOBILE RESPONSIVE TEST

**Resize browser to mobile width (375px)**

### Visual Checks:
- [ ] Floating emojis still visible (fewer on mobile)
- [ ] Text is readable
- [ ] Buttons are clickable
- [ ] No horizontal scroll
- [ ] Cards stack vertically
- [ ] Footer buttons wrap properly

---

## 🎨 SPOOKY EFFECTS TEST

### Hover Effects:
- [ ] Titles glitch on hover
- [ ] Cards lift on hover
- [ ] Icons rotate on hover
- [ ] Buttons glow on hover

### Animations:
- [ ] Emojis float and rotate
- [ ] Subtitles flicker
- [ ] Buttons have heartbeat pulse
- [ ] Cards have eerie glow

### Performance:
- [ ] Animations are smooth (60fps)
- [ ] No lag or stuttering
- [ ] Page loads quickly

---

## ✅ FINAL CHECKS

### Functionality:
- [ ] All 3 chambers work end-to-end
- [ ] All downloads work
- [ ] All navigation works
- [ ] All sample files load

### Visual:
- [ ] Spooky theme consistent across pages
- [ ] Text is readable
- [ ] Colors look good
- [ ] No broken layouts

### Performance:
- [ ] Pages load in < 3 seconds
- [ ] No console errors
- [ ] Animations are smooth

---

## 🚨 COMMON ISSUES & FIXES

### Issue: "Cannot find module" error
**Fix**: Run `npm install`

### Issue: Port already in use
**Fix**: Kill process or use different port

### Issue: API returns 500 error
**Fix**: Check API route files, restart server

### Issue: Spooky effects not showing
**Fix**: Clear browser cache, hard refresh (Ctrl+Shift+R)

### Issue: Downloads not working
**Fix**: Check browser download settings

---

## 🎯 DEMO READINESS CHECKLIST

Before the hackathon demo:

- [ ] All chambers tested and working
- [ ] Sample files load correctly
- [ ] Downloads work
- [ ] No console errors
- [ ] Spooky effects visible
- [ ] Mobile responsive
- [ ] Deployed version tested (if using Vercel)
- [ ] Backup video recorded
- [ ] Screenshots taken
- [ ] Demo script practiced

---

## 🏆 YOU'RE READY TO WIN!

If all checks pass, your app is:
- ✅ Fully functional
- ✅ Visually impressive
- ✅ Production-ready
- ✅ Demo-ready

**GO DOMINATE THAT HACKATHON!** 🎃👻💀
