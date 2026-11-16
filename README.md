# FTO Quest

לומדת FTO אינטראקטיבית בעברית — גרסת התנסות ראשונה.

## פתיחה

המשחק זמין בכתובת: https://amitshe.github.io/fto-quest/

במחשב פותחים את הקישור בדפדפן. בנייד פותחים ב־Safari או Chrome. באייפון בוחרים שיתוף → ״הוסף למסך הבית״; באנדרואיד בוחרים ״התקנת אפליקציה״ בתפריט Chrome. אייקון מקורי מותאם למסך הבית כלול באפליקציה.

## מה אפשר לעשות עכשיו

- לעבור שבע משימות קצרות: סימון תנועות, מרכז ראשון, שתי שלשות, מרכזים, Sledge, Hedge ואתגר פתור קטן.
- לצפות בכל תנועה כאנימציית סיבוב ב־FTO תלת־ממדית, ולעבור בכל רגע לפריסת 2D.
- לבחור מצב בהיר או מצב כהה; הבחירה נשמרת במכשיר.
- לתרגל על קובייה פיזית. השלבים הפיזיים מאושרים עצמאית ואינם נבדקים אוטומטית.
- להיכנס למעבדת אימון, לקבל ערבוב FTO ולמדוד זמן.
- ההתקדמות נשמרת מקומית בדפדפן של אותו מכשיר.

זו גרסת התנסות של תחילת המסלול. הדרכה מפורטת לכל מקרי Bencisco ו־L3T עדיין אינה כלולה.

## פיתוח

האתר סטטי; `index.html`, `style.css` ו־`app.js` הם קובצי המקור. מנוע הקובייה נטען מ־[cubing.js](https://js.cubing.net/cubing/) דרך CDN, ולכן נדרש חיבור לרשת להצגת הקובייה. להרצה מקומית יש להגיש את הקבצים בשרת HTTP, למשל `python3 -m http.server 8000`, ולפתוח `http://localhost:8000/`. פתיחת `file://` אינה תומכת ביצירת ערבובים.

מקורות לימוד: [Ben Streeter / Bencisco](https://www.youtube.com/watch?v=tYeV8LvqVDY), [מדריך Tingman](https://www.youtube.com/watch?v=6GIyEJP5FO8), [Chris Choi](https://www.youtube.com/watch?v=6JT2tU00ccs), [LowCubes](https://www.lowcubes.com/fto), [Jaap's Puzzle Page](https://www.jaapsch.net/puzzles/octaface.htm).
