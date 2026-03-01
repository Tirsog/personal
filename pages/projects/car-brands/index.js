import Head from "next/head"
import styles from "../../../styles/CarBrands.module.css"

// Multiple candidate filenames per brand — API picks the first one that exists
// Ferrari, Porsche, Lamborghini intentionally last (row 8 with 3-col print layout)
const brandList = [
    { name: "Ford",        files: ["Ford_logo_flat.svg"] },
    { name: "Kia",         files: ["KIA_logo3.svg", "KIA_logo2.svg", "KIA_logo.svg"] },
    { name: "BMW",         files: ["BMW.svg"] },
    { name: "Audi",        files: ["Audi-Logo_2016.svg"] },
    { name: "Jeep",        files: ["Jeepnewlogo.svg", "Jeep_logo.svg"] },
    { name: "Honda",       files: ["Honda_Logo.svg"] },
    { name: "Toyota",      files: ["Toyota_carlogo.svg"] },
    { name: "Nissan",      files: ["Nissan_2020_logo.svg"] },
    { name: "Mazda",       files: ["Mazda_logo.svg"] },
    // Vauxhall SVG lives on en.wikipedia (not Commons) — use direct URL
    { name: "Vauxhall",    url: "https://upload.wikimedia.org/wikipedia/en/1/18/Vauxhall_logo_2019.svg" },
    { name: "Tesla",       files: ["Tesla_Motors.svg"] },
    { name: "Volvo",       files: ["Volvo_logo.svg"] },
    { name: "Fiat",        files: ["FIAT_logo_(2020).svg", "Fiat_Automobiles_logo.svg"] },
    { name: "Lexus",       files: ["Lexus_logo.svg"] },
    { name: "Hyundai",     files: ["Hyundai_Motor_Company_logo.svg"] },
    { name: "Renault",     files: ["Renault_2021_Text.svg", "Renault_2009_logo.svg"] },
    { name: "Peugeot",     files: ["Peugeot_Logo.svg", "Peugeot_logo.svg"] },
    { name: "Volkswagen",  files: ["Volkswagen_logo_2019.svg"] },
    { name: "Mitsubishi",  files: ["Mitsubishi_motors_new_logo.svg", "Mitsubishi_Motors_SVG_logo.svg"] },
    { name: "Seat",        files: ["SEAT_Logo_from_2017.svg", "SEAT_S.A._logo.svg"] },
    { name: "Mercedes",    files: ["Mercedes-Logo.svg"] },
    // Last row
    { name: "Ferrari",     files: ["Ferrari_wordmark.svg", "Ferrari_wordmark_vector_HQ.svg"] },
    { name: "Porsche",     files: ["Porsche_Wortmarke.svg", "Porsche_wordmark.svg"] },
    { name: "Lamborghini", files: ["Lamborghini_-_logo_wordmark_(italy,_1963-).svg"] },
]

export default function CarBrands({ brands }) {
    return (
        <>
            <Head>
                <title>Car Brands – Learn to Read</title>
                <meta
                    name="description"
                    content="Learn to read car brand names with logos"
                />
                {/* Remove browser-injected headers/footers (URL, date, page numbers) */}
                <style>{`@page { margin: 0; }`}</style>
            </Head>

            <div className={styles.page}>
                <div className={styles.header}>
                    <h1 className={styles.title}>Car Brands</h1>
                    <p className={styles.subtitle}>
                        Can you read all the car names?
                    </p>
                    <button
                        className={styles.printBtn}
                        onClick={() => window.print()}
                    >
                        Print
                    </button>
                </div>

                <div className={styles.grid}>
                    {brands.map((brand) => (
                        <div key={brand.name} className={styles.card}>
                            <p className={styles.nameUpper}>
                                {brand.name.toUpperCase()}
                            </p>
                            <p className={styles.nameLower}>{brand.name}</p>
                            <div className={styles.logoBox}>
                                {brand.logo ? (
                                    <img
                                        src={brand.logo}
                                        alt={`${brand.name} logo`}
                                        className={styles.logo}
                                    />
                                ) : (
                                    <span className={styles.fallback}>
                                        {brand.name[0]}
                                    </span>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}

export async function getStaticProps() {
    try {
        // Deduplicate all candidate filenames across brands (skip entries with a direct url)
        const allFiles = [...new Set(brandList.flatMap((b) => b.files ?? []))]

        const titleStr = allFiles
            .map((f) => encodeURIComponent(`File:${f}`))
            .join("|")

        const res = await fetch(
            `https://commons.wikimedia.org/w/api.php?action=query&titles=${titleStr}&prop=imageinfo&iiprop=url&iiurlwidth=300&format=json&origin=*`,
            {
                headers: {
                    "User-Agent": "CarBrandsLearning/1.0 (personal project)",
                },
            }
        )

        if (!res.ok) throw new Error(`Wikimedia API error: ${res.status}`)
        const data = await res.json()

        // Map canonical page titles → thumburl (skip missing files)
        const thumbByCanonical = {}
        Object.values(data.query?.pages || {}).forEach((page) => {
            if ("missing" in page) return
            thumbByCanonical[page.title] =
                page.imageinfo?.[0]?.thumburl || null
        })

        // Normalisation: submitted title → canonical title (e.g. underscores → spaces)
        const toCanonical = {}
        ;(data.query?.normalized || []).forEach(({ from, to }) => {
            toCanonical[from] = to
        })

        function getThumb(file) {
            const submitted = `File:${file}`
            const canonical = toCanonical[submitted] || submitted
            return (
                thumbByCanonical[canonical] ||
                thumbByCanonical[submitted] ||
                null
            )
        }

        const brands = brandList.map(({ name, files, url }) => ({
            name,
            // url = hardcoded direct link (e.g. en.wikipedia); files = Commons lookup
            logo: url ?? files.map(getThumb).find(Boolean) ?? null,
        }))

        return { props: { brands } }
    } catch (err) {
        console.error("Failed to fetch logos:", err)
        return {
            props: {
                brands: brandList.map(({ name, url }) => ({ name, logo: url ?? null })),
            },
        }
    }
}
