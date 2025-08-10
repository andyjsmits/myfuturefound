diff --git a/src/components/Header.tsx b/src/components/Header.tsx
index 5e2083018d4eff77ed02f3740d4a8a09be2931d9..437a3a0ab891f3d8701096b2afb0a76978f3d357 100644
--- a/src/components/Header.tsx
+++ b/src/components/Header.tsx
@@ -1,15 +1,21 @@
 'use client'
 
 export default function Header() {
   return (
-    <header className="bg-white shadow-sm">
+    <header className="fixed top-0 w-full bg-white/70 backdrop-blur-md z-50">
       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
-        <div className="flex justify-center items-center py-6">
-          <div className="flex items-center">
-            <h1 className="text-2xl font-bold text-gray-900">My Future Found</h1>
-          </div>
+        <div className="flex justify-between items-center py-4">
+          <h1 className="text-2xl font-bold text-gray-900">My Future Found</h1>
+          <nav className="space-x-4">
+            <a href="#assessment" className="text-sm font-medium text-gray-700 hover:text-gray-900">
+              Assessment
+            </a>
+            <a href="#" className="text-sm font-medium text-gray-700 hover:text-gray-900">
+              About
+            </a>
+          </nav>
         </div>
       </div>
     </header>
   )
 }
