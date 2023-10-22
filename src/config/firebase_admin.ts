import admin from "firebase-admin";
let adminApp: admin.app.App;
adminApp =
  admin.apps.length > 0
    ? admin.app("admin-app")
    : admin.initializeApp(
        {
          credential: admin.credential.cert({
            projectId: process.env.NEXT_PUBLIC_FIREBASE_ADMIN_PROJECT_ID,
            clientEmail: process.env.NEXT_PUBLIC_FIREBASE_ADMIN_CLIENT_EMAIL,
            privateKey:
              process.env.NEXT_PUBLIC_FIREBASE_ADMIN_PRIVATE_KEY?.replace(
                /\\n/g,
                "\n"
              ),
          }),
        },
        "admin-app"
      );
const adminAuth = adminApp.auth();
const adminFirestore = adminApp.firestore();
export { adminAuth, adminFirestore };
