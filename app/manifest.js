export default function manifest() {
    return {
        name: "Журнал Cделок трейдинга Homa-Trading",
        short_name: "Журнал Cделок",
        description: "Журнал Cделок трейдинга Homa-Trading для трейдеров",
        start_url: "/",
        display: "standalone",
        background_color: "#fff",
        theme_color: "#fff",
        icons: [
            {
                src: "/icon1.png",
                sizes: "192x192",
                type: "image/png",
            },
            {
                src: "/icon2.png",
                sizes: "512x512",
                type: "image/png",
            },
        ],
    };
}
