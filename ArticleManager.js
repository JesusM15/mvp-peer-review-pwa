const ArticleManager = {
    async processSubmission(title, file) {
        if (!title || !file) throw new Error("Datos incompletos");
        if (file.type !== "application/pdf") throw new Error("Solo se permiten PDFs");

        const articleData = {
            title,
            fileContent: file, // Se guarda como Blob/File directamente
            status: "Recibido",
            timestamp: new Date().toISOString(),
            feedback: {}
        };

        return await ArticleStorage.save(articleData);
    }
};
