"use client"

import { useState } from "react"
import styles from "../../styles/Bees.module.css"

export default function BeekeeperCalendar() {
    const [activeTab, setActiveTab] = useState("flowers")

    const flowersData = [
        {
            month: "January",
            flowers: [
                { name: "Snowdrop", note: "Early nectar source" },
                { name: "Winter jasmine", note: "Early winter flowering shrub" },
                { name: "Mahonia", note: "Fragrant winter flowering shrub" },
            ],
        },
        {
            month: "February",
            flowers: [
                { name: "Hazel", note: "Early pollen source" },
                { name: "Snowdrop", note: "One of the first nectar sources" },
                { name: "Crocus", note: "Important early nectar source" },
                {
                    name: "Salix (Willow)",
                    note: "Excellent early pollen source",
                },
                { name: "Winter jasmine", note: "Continuing winter flowering" },
                { name: "Mahonia", note: "Fragrant early spring flowering" },
            ],
        },
        {
            month: "March",
            flowers: [
                { name: "Hazel", note: "Continuing pollen source" },
                { name: "Snowdrop", note: "Early nectar" },
                { name: "Crocus", note: "Important early nectar" },
                {
                    name: "Willow",
                    note: "Essential early pollen for brood rearing",
                },
                { name: "Pears", note: "Early fruit tree nectar" },
                { name: "Plums", note: "Early fruit tree nectar" },
                { name: "Mahonia", note: "Late winter/early spring flowering" },
            ],
        },
        {
            month: "April",
            flowers: [
                {
                    name: "Oil seed rape",
                    note: "Major nectar flow where available",
                },
                { name: "Cherry", note: "Excellent nectar and pollen source" },
                { name: "Ribes", note: "Currant family - good early nectar" },
                {
                    name: "Hawthorn",
                    note: "Major nectar source, can produce surplus honey",
                },
                { name: "Horse chestnut", note: "Good nectar source" },
                { name: "Apples", note: "Important fruit tree nectar" },
                {
                    name: "Dandelion",
                    note: "Abundant and reliable spring forage",
                },
                { name: "Mahonia", note: "Garden shrub providing nectar" },
            ],
        },
        {
            month: "May",
            flowers: [
                { name: "Oil seed rape", note: "Continuing major flow" },
                { name: "Cherry", note: "Peak flowering period" },
                { name: "Ribes", note: "Continuing nectar source" },
                { name: "Horse chestnut", note: "Peak nectar production" },
                { name: "Holly", note: "Good nectar source" },
                { name: "Dead nettle", note: "Common ground cover nectar" },
                {
                    name: "Cotoneaster",
                    note: "Garden shrub with abundant flowers",
                },
                { name: "Apples", note: "Peak fruit tree flowering" },
                { name: "Dandelion", note: "Continuing reliable source" },
                { name: "Mahonia", note: "Late spring flowering" },
                { name: "Sycamore", note: "Tree nectar source" },
                { name: "Field bean", note: "Agricultural crop nectar" },
                { name: "Raspberry", note: "Excellent nectar and pollen" },
            ],
        },
        {
            month: "June",
            flowers: [
                {
                    name: "White clover",
                    note: "Premium honey source - June Gap may occur",
                },
                {
                    name: "Lime",
                    note: "Can produce exceptional crops in warm conditions",
                },
                { name: "Field beans", note: "Continuing agricultural nectar" },
                { name: "Dead nettle", note: "Reliable ground cover" },
                { name: "Ragwort", note: "Common wildflower nectar" },
                { name: "Sunflower", note: "Where grown - excellent nectar" },
                { name: "Blackberry", note: "Beginning of major summer flow" },
                { name: "Holly", note: "Continuing nectar source" },
                { name: "Dandelion", note: "Still available" },
                { name: "Privet", note: "Hedge plant with abundant flowers" },
                {
                    name: "Oil seed rape (late)",
                    note: "Late varieties still flowering",
                },
                { name: "Phacelia", note: "Where sown as bee crop" },
            ],
        },
        {
            month: "July",
            flowers: [
                {
                    name: "White clover",
                    note: "Main flow - premium honey source",
                },
                { name: "Blackberry", note: "Major summer nectar source" },
                { name: "Dandelion", note: "Continuing source" },
                { name: "Dead nettle", note: "Reliable nectar" },
                {
                    name: "Lavender",
                    note: "Garden favorite producing excellent honey",
                },
                { name: "Field beans", note: "Continuing where grown" },
                { name: "Privet", note: "Peak flowering of hedges" },
                {
                    name: "Michaelmas daisies",
                    note: "Early varieties beginning",
                },
                {
                    name: "Rosebay willow herb",
                    note: "Important late summer source",
                },
            ],
        },
        {
            month: "August",
            flowers: [
                { name: "Red clover", note: "Where accessible to honeybees" },
                { name: "Blackberry", note: "Continuing major source" },
                { name: "Michaelmas daisies", note: "Peak flowering period" },
                { name: "Dandelion", note: "Still providing nectar" },
                { name: "Dead nettle", note: "Reliable late summer source" },
                { name: "Lavender", note: "Continuing excellent nectar" },
                { name: "Privet", note: "Late summer flowering" },
                { name: "Ragwort", note: "Common late summer wildflower" },
                {
                    name: "Rosebay willow herb",
                    note: "Major late season source",
                },
                {
                    name: "Himalayan balsam",
                    note: "Invasive but valuable late nectar",
                },
            ],
        },
        {
            month: "September",
            flowers: [
                { name: "Late rosebay", note: "Continuing important source" },
                { name: "Late Erica", note: "Heather family" },
                { name: "Ling heather", note: "Moorland specialty honey" },
                { name: "Michaelmas daisies", note: "Peak autumn flowering" },
                {
                    name: "Himalayan balsam",
                    note: "Continuing late season nectar",
                },
                { name: "Ivy", note: "Beginning crucial autumn flow" },
            ],
        },
        {
            month: "October",
            flowers: [
                {
                    name: "Ivy",
                    note: "Major late season nectar - crucial for winter prep",
                },
            ],
        },
        {
            month: "November",
            flowers: [{ name: "Ivy", note: "Final nectar source of the year" }],
        },
        {
            month: "December",
            flowers: [
                { name: "Winter jasmine", note: "Beginning winter flowering" },
                { name: "Mahonia", note: "Early winter flowering shrub" },
            ],
        },
    ]

    const beekeeperData = [
        {
            month: "January",
            work: [
                "Oxalic acid treatment (if planned)",
                "Check for stores and feed if necessary with candy",
                "Check for damage to hives",
                "Ensure mouse guards and woodpecker protection in place",
                "Repair/replace woodwork for next season",
                "Attend Winter Association meetings/briefings/studying",
            ],
            colony: [
                "In cluster",
                "Flying on warm days for defecation and water",
                "No brood",
                "Utilizing stores",
                "Queen may start laying if warm enough at end of month",
            ],
            forage: ["None"],
        },
        {
            month: "February",
            work: [
                "Check for hive damage",
                "Check for stores and feed if necessary by hefting and with candy",
                "Repair/replace woodwork for next season",
                "Remove mouse guards so pollen is not knocked off rear legs",
                "Attend Winter Association meetings/briefings",
            ],
            colony: [
                "Cluster starting to break up",
                "Queen may start to lay if warm enough",
                "Utilizing stores",
            ],
            forage: ["Hazel", "Snowdrop", "Crocus", "Salix (Willow)"],
            note: "Critical to keep eye on stores and feed if starvation threatens. Some beekeepers do stimulating feed including pollen.",
        },
        {
            month: "March",
            work: [
                "Quick check of colony on warm day",
                "Check adequate stores, feed if necessary",
                "Monitor varroa mite drop",
                "Remove Mouse Guards (South - done last month)",
                "Can give additional feed if OSR in area",
                "Replace floor & boxes if good weather",
                "Remove quilts",
            ],
            colony: [
                "Cluster broken up",
                "Queen laying",
                "Bees starting to forage for pollen and nectar",
                "Winter bees dying",
            ],
            forage: ["Hazel", "Snowdrop", "Crocus", "Willow", "Pears", "Plums"],
        },
        {
            month: "April",
            work: [
                "Start regular brood box checks for stores, queen presence, disease signs",
                "Ensure sufficient space for laying and stores",
                "Swarm preparations monitoring",
                "Comb change - old combs to outer edges",
                "Mark and clip queens if desired",
                "Add supers",
            ],
            colony: [
                "Queen laying strongly if good nectar flow",
                "Colony increasing in size",
                "Drone eggs being laid",
                "Queen cells may be produced",
            ],
            forage: [
                "Oil seed rape",
                "Cherry",
                "Ribes",
                "Hawthorn",
                "Horse chestnut",
                "Apples",
                "Dandelion",
                "Mahonia",
            ],
            note: "Beginning of swarming season - watch for drone brood and prevent overcrowding",
        },
        {
            month: "May",
            work: [
                "Regular brood health checks",
                "Monitor varroa",
                "Swarm control",
                "Artificial swarms for increase",
                "Drone brood culling/icing sugar",
                "Add supers (70% rule)",
                "New queen raising and preparation of nucs",
            ],
            colony: [
                "Queen laying strongly",
                "Colony increasing in size",
                "Drones being hatched",
                "Queen cells produced",
                "Virgin queens on mating flights",
            ],
            forage: [
                "Oil seed rape",
                "Cherry",
                "Ribes",
                "Horse chestnut",
                "Holly",
                "Dead nettle",
                "Cotoneaster",
                "Apples",
                "Dandelion",
                "Sycamore",
                "Field bean",
                "Raspberry",
            ],
        },
        {
            month: "June",
            work: [
                "Regular brood health checks",
                "Swarm control",
                "Artificial swarms for increase",
                "Monitor for varroa",
                "Add supers",
                "May need feeding if June Gap occurs",
            ],
            colony: [
                "Queen continues laying (rate dependent on flow)",
                "May produce queen cells",
                "Virgin queens on mating flights",
                "Colony size at maximum",
            ],
            forage: [
                "White clover",
                "Lime",
                "Field beans",
                "Dead nettle",
                "Ragwort",
                "Sunflower",
                "Blackberry",
                "Holly",
                "Dandelion",
                "Privet",
                "Late OSR",
                "Phacelia",
            ],
            note: "June Gap may occur - feeding may be necessary especially if spring honey removed",
        },
        {
            month: "July",
            work: [
                "Check for queen cells - swarm control",
                "Add supers",
                "Unite colonies",
                "Regular brood health checks",
                "Wasp control, reduced entrances",
                "Honey harvest - remove supers",
            ],
            colony: ["Queen still laying worker brood"],
            forage: [
                "White clover",
                "Blackberry",
                "Dandelion",
                "Dead nettle",
                "Lavender",
                "Field beans",
                "Privet",
                "Michaelmas daisies",
                "Rosebay willow herb",
            ],
            note: "MAIN FLOW period. May be early to remove supers - usually August is main harvest time.",
        },
        {
            month: "August",
            work: [
                "Honey harvest - remove supers",
                "Check for diseases before uniting",
                "Treat with varroacide if mite drop high",
                "Replace queens as necessary",
                "Unite colonies",
                "Feed to reach 18-20kg stores level",
            ],
            colony: [
                "Colony starting to contract",
                "No new drone brood",
                "Queen's laying rate slows, may stop if no forage",
                "Fending off wasps",
            ],
            forage: [
                "Red clover",
                "Blackberry",
                "Michaelmas daisies",
                "Dandelion",
                "Dead nettle",
                "Lavender",
                "Privet",
                "Ragwort",
                "Rosebay willow herb",
                "Himalayan balsam",
            ],
            note: "Ideal time after supers removed to reduce varroa with varroacide. Requeening can boost winter numbers.",
        },
        {
            month: "September",
            work: [
                "Complete varroa treatment",
                "Feed colonies",
                "Shake weak colonies",
                "Requeen if needed",
                "Unite weak colonies",
                "Winter preparations: mouseguards, super under, quilts/ventilation",
            ],
            colony: [
                "Drones ejected",
                "Queen rate of laying slows",
                "Colony population starts to decline",
                "Queen laying winter bees",
            ],
            forage: [
                "Late rosebay",
                "Late Erica",
                "Ling heather",
                "Michaelmas daisies",
                "Himalayan balsam",
                "Ivy",
            ],
        },
        {
            month: "October",
            work: [
                "Finish all September jobs",
                "Monitor for varroa late October for December oxalic acid",
                "Remove queen excluders",
                "Early October - place brood and half super below if using",
                "Remove ivy supers",
            ],
            colony: [
                "Cluster starting to form",
                "Bees fly for water and toilet on warm days",
                "Brood declining",
                "Utilizing stores",
            ],
            forage: ["Ivy"],
        },
        {
            month: "November",
            work: [
                "Inspect apiaries weekly/fortnightly",
                "Check adequate stores by hefting",
                "Check for damage and correct",
                "Start preparing frames, boxes for next season",
                "Check entrance free of dead bees/debris",
                "Attend Winter Association meetings",
            ],
            colony: [
                "In cluster",
                "Flying on warm days for water and defecation",
                "Very little brood",
                "Utilizing stores",
            ],
            forage: ["Ivy"],
        },
        {
            month: "December",
            work: [
                "Inspect apiaries weekly/fortnightly",
                "Check adequate stores",
                "Oxalic acid treatment when minimal brood",
                "Repair/replace woodwork",
                "Start planning for next year",
                "Check previous record cards and review",
            ],
            colony: [
                "Cluster",
                "No brood (though in South UK queens may continue laying)",
                "Flying on warm days for water and defecation",
                "Utilizing stores",
            ],
            forage: ["None"],
        },
    ]

    return (
        <div className={styles.pageContainer}>
            <div className={styles.container}>
                {/* Header */}
                <div className={styles.header}>
                    <h1 className={styles.headerTitle}>
                        🐝 UK Beekeeper´s Calendar
                    </h1>
                    <p className={styles.headerSubtitle}>
                        Based on A YEAR´S WORK - Z REVISION TOPIC 1.14
                    </p>
                </div>

                {/* Tabs */}
                <div className={styles.tabs}>
                    <div className={styles.tabsInner}>
                        <button
                            onClick={() => setActiveTab("flowers")}
                            className={`${styles.tab} ${
                                activeTab === "flowers"
                                    ? styles.tabActiveFlowers
                                    : styles.tabInactive
                            }`}
                        >
                            🌸 Bee Forage Flowers
                        </button>
                        <button
                            onClick={() => setActiveTab("beekeeper")}
                            className={`${styles.tab} ${
                                activeTab === "beekeeper"
                                    ? styles.tabActiveBeekeeper
                                    : styles.tabInactive
                            }`}
                        >
                            🧑‍🌾 Beekeeper´s Year
                        </button>
                    </div>
                </div>

                {/* Flowers Tab Content */}
                {activeTab === "flowers" && (
                    <div className={styles.content}>
                        {flowersData.map((monthData) => (
                            <div
                                key={monthData.month}
                                className={styles.card}
                            >
                                <div className={styles.cardHeaderFlowers}>
                                    <h2 className={styles.cardHeaderTitle}>
                                        {monthData.month}
                                    </h2>
                                </div>
                                <div className={styles.cardBody}>
                                    <div className={styles.flowerTags}>
                                        {monthData.flowers.map(
                                            (flower, index) => (
                                                <span
                                                    key={index}
                                                    className={styles.flowerTag}
                                                >
                                                    {flower.name}
                                                </span>
                                            )
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Beekeeper Tab Content */}
                {activeTab === "beekeeper" && (
                    <div className={styles.content}>
                        {beekeeperData.map((monthData) => (
                            <div
                                key={monthData.month}
                                className={styles.card}
                            >
                                <div className={styles.cardHeaderBeekeeper}>
                                    <h2 className={styles.cardHeaderTitle}>
                                        {monthData.month}
                                    </h2>
                                </div>
                                <div className={styles.section}>
                                    <div className={styles.beekeeperGrid}>
                                        {/* Work Section */}
                                        <div>
                                            <h3 className={styles.sectionTitle}>
                                                🔧 Work by Beekeeper
                                            </h3>
                                            <ul className={styles.list}>
                                                {monthData.work.map(
                                                    (task, index) => (
                                                        <li
                                                            key={index}
                                                            className={styles.listItem}
                                                        >
                                                            <span className={styles.bulletWork}>
                                                                •
                                                            </span>
                                                            {task}
                                                        </li>
                                                    )
                                                )}
                                            </ul>
                                        </div>

                                        {/* Colony State Section */}
                                        <div>
                                            <h3 className={styles.sectionTitle}>
                                                🐝 State of Colony
                                            </h3>
                                            <ul className={styles.list}>
                                                {monthData.colony.map(
                                                    (state, index) => (
                                                        <li
                                                            key={index}
                                                            className={styles.listItem}
                                                        >
                                                            <span className={styles.bulletColony}>
                                                                •
                                                            </span>
                                                            {state}
                                                        </li>
                                                    )
                                                )}
                                            </ul>
                                        </div>

                                        {/* Forage Section */}
                                        <div>
                                            <h3 className={styles.sectionTitle}>
                                                🌺 Local Bee Forage
                                            </h3>
                                            <div className={styles.forageContainer}>
                                                {monthData.forage.map(
                                                    (plant, index) => (
                                                        <span
                                                            key={index}
                                                            className={styles.forageTag}
                                                        >
                                                            {plant}
                                                        </span>
                                                    )
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Note Section */}
                                    {monthData.note && (
                                        <div className={styles.note}>
                                            <p className={styles.noteText}>
                                                <strong>Note:</strong>{" "}
                                                {monthData.note}
                                            </p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Footer */}
                <div className={styles.footer}>
                    <p className={styles.footerText}>
                        Let me know if there are any issues with this page.
                    </p>
                </div>
            </div>
        </div>
    )
}
