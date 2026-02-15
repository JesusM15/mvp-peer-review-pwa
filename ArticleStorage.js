const ArticleStorage = {
    dbName: "PeerReviewDB",
    init() {
        return new Promise((resolve, reject) => {
            const request = indexedDB.open(this.dbName, 1);
            request.onupgradeneeded = (e) => {
                const db = e.target.result;
                if (!db.objectStoreNames.contains("articles")) {
                    db.createObjectStore("articles", { keyPath: "id", autoIncrement: true });
                }
            };
            request.onsuccess = () => resolve(request.result);
            request.onerror = () => reject("Error abriendo IndexedDB");
        });
    },
    async save(article) {
        const db = await this.init();
        return new Promise((resolve, reject) => {
            const transaction = db.transaction("articles", "readwrite");
            const store = transaction.objectStore("articles");
            const request = store.add(article);
            request.onsuccess = () => resolve(request.result);
            request.onerror = () => reject("Error al guardar");
        });
    }
};
