## 📱 UoA Your Way – Mobile App & CMS Demo

**UoA Your Way** is a dual-platform system designed to support international students preparing to study at the University of Auckland through an offshore-to-onshore study pathway.

It consists of:

* 📱 A **React Native mobile app** for prospective students
* 🖥️ A **web-based Content Management System (CMS)** for staff to easily manage learning modules and onboarding content

The goal of this project is to improve pre-enrollment engagement and help international students explore programmes, campus life, and New Zealand culture — while giving university staff an intuitive tool to manage content with no technical knowledge required.

> ✅ **This demo version disables editing and deletion actions to protect sample data.**

🎥 **Video Demo:**
[https://www.youtube.com/watch?v=tDsgT_pjNCU](https://www.youtube.com/watch?v=tDsgT_pjNCU)

---

## 🚀 Live Demo Access

### 🖥️ CMS Demo

🔗 [https://399-cms.vercel.app/](https://399-cms.vercel.app/)

**Login Credentials**

```
Email: demo@demo.com
Password: 123456
```

### 📱 Android App (APK)

Download from Releases:
🔗 [https://github.com/JackZhen1/UoA-Online-Cross-Platform-Web-Mobile-Application-/releases/tag/v1.0.0](https://github.com/JackZhen1/UoA-Online-Cross-Platform-Web-Mobile-Application-/releases/tag/v1.0.0)

**Installation**

1. Download the `.apk`
2. Open it on your Android device
3. Allow installation from unknown sources
4. Log in with the demo account above


📱 iOS & 💻 Desktop Access

Unfortunately, an .ipa (iOS installer) is not available for this demo due to Apple’s strict distribution policies — installing apps outside the App Store requires device provisioning and a paid Apple developer account.

However, you can still experience the app even without an Android device.

✅ Option: Use an Android Emulator (Windows / macOS)

You can install and run the APK using an emulator, such as:

* Android Studio Emulator
* BlueStacks

This allows you to use and test the app just like on a physical Android device.

---
## 🧠 Tech Stack

### Mobile App

* React Native (Expo)
* TypeScript
* JWT-based authentication

### CMS (Admin Panel)

* React + TypeScript
* TailwindCSS
* Tiptap Rich Text Editor

### Backend

* Node.js + Express
* MongoDB (Mongoose ORM)
* REST API
* JWT authentication & role-based access

---

## 🏗️ System Architecture

```
Mobile App  ⇄  REST API  ⇄  MongoDB
    ↓               ↑
CMS Admin UI  ──────┘
```

---

## 📦 Deployment
This demo uses a modified deployment setup compared to the full production environment to support public testing.

| Service    | Platform                                |
| ---------- | --------------------------------------- |
| CMS        | Vercel                                  |
| API        | Render
| MongoDB    | MongoDB Atlas                           |
| Mobile App | Expo EAS build (.apk)                   |


---

## 🌟 Future Enhancements

* ✅ Push to Google Play & Apple App Store via EAS build + store submissions
* 🌏 China-accessible infrastructure (CDN + cloud hosting)
* 📊 Analytics for student engagement & conversion tracking
* 💬 Community support forum for international students
* 🔐 Role-based admin tools & workflow approval system

---

## 👥 Team

This project was completed as part of **COMPSCI 399 – Capstone Project, University of Auckland**.

| Member        | Role                                    |
| ------------- | --------------------------------------- |
| Leon Huang    | Team Lead, CMS Full-Stack               |
| Derrick Trang | PM, Backend Developer                   |
| **Jack Zhen** | **Full-Stack (Mobile & CMS)** ✅ *(me)* |
| Andy Xu       | Mobile Frontend                         |
| Gavin Ding    | CMS Full-Stack                          |
| Andrew Yao    | Mobile Frontend                         |
| Advisor       | Ellie Shedden                           |

---

## 📝 License

This project was developed as part of a university capstone course.
Usage is restricted for demonstration and academic purposes.

---


