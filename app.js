// ============================================================
//  THE HOLLOWED KEEP
//  A Text Adventure  ·  Est. 993 A.D.
//  hollowkeep.net:6660  ·  Version 2.17
// ============================================================

// === CASTLE ASCII ART ===

const CASTLE_ART = `
                                         .  *  .      *                .
                    *         .                    .         *
                                    _||_    _||_
                         __       _|    |__|    |_       __
                    _||_|  |_   _|                |_   _|  |_||_
                   |         |_|    _   ____   _    |_|         |
                   |  ||  || |     |_| |    | |_|     | ||  ||  |
              _____|  ||  || |   _                _   | ||  ||  |_____
             |     |         |  |_|   _    _   |_|  |         |     |
             | ||  |_________|       | |  | |       |_________| ||  |
        _____|_||__|    |    |  __   |_|  |_|   __  |    |    |__||_|_____
       |     |     |    |    | |  |            |  | |    |    |     |     |
       | ||  | ||  |    |    | |__|    _  _    |__| |    |    | ||  | ||  |
  _____|_||__|_||__|____|____|       _| || |_       |____|____|_||__|_||__|_____
 |     |     |     |    |    |      |        |      |    |    |     |     |     |
 |_____|_____|_____|____|____|______|__ __ __|______|____|____|_____|_____|_____|
                                   |          |
                                   |  ||  ||  |
                                   |__||__||__|
`;

// === WORLD DATA ===

const ROOMS = {
  moor_path: {
    name: "The Moor Path",
    region: "The Approach",
    desc: "A narrow trail winds through black bracken and twisted heather. Fog clings to the earth like a living thing, swallowing the moor behind you. To the north, a shape looms through the mist—something vast and angular that should not be here. The air tastes of iron and old stone.",
    exits: { north: "crumbling_bridge" },
    items: ["journal_page_1"],
    firstVisit: "Your boots sink into sodden peat. Somewhere in the fog, something moves—low and quick. You grip your pack tighter and press on.",
    search: "Beneath a rotting log, you find scratches in the wood: 'TURN BACK'. The handwriting is frantic.",
  },
  crumbling_bridge: {
    name: "The Crumbling Bridge",
    region: "The Approach",
    desc: "A stone bridge arcs over a chasm of unknowable depth. The stones are ancient, carved with symbols that seem to shift when viewed indirectly. Several blocks are missing—the crossing is possible but demands care. The wind screams upward from below, carrying whispers that are almost words.",
    exits: { south: "moor_path", north: "outer_gate" },
    items: [],
    firstVisit: "You test each stone before committing your weight. One crumbles under your hand and falls into the abyss. You never hear it land.",
    search: "Among the carved symbols you find one that's newer than the rest—a crude eye, scratched deep into the stone.",
  },
  outer_gate: {
    name: "The Outer Gate",
    region: "The Approach",
    desc: "Massive iron gates stand ajar, their hinges frozen with centuries of rust. The gatehouse beyond is a squat structure of black stone, its arrow slits watching like hollow eyes. Deep gouges mark the gates—claw marks, from something that wanted in. Or perhaps something that wanted out.",
    exits: { south: "crumbling_bridge", north: "gatehouse" },
    items: [],
    firstVisit: "As you pass through, the gates groan—though there is no wind to move them.",
  },
  gatehouse: {
    name: "The Gatehouse",
    region: "The Approach",
    desc: "A cramped chamber with a murder hole in the ceiling and rusted chains that once held a portcullis. A wooden table holds a guttering candle—impossible, who lit it? A hook on the wall holds a key. Rat droppings litter the floor, but the rats themselves are nowhere to be seen.",
    exits: { south: "outer_gate", north: "main_courtyard" },
    items: ["torch", "iron_key"],
    search: "Behind the table, carved into the wall: 'The dead walk below. Steel is nothing. Bring silver.' A small tin holds flint and dry tinder.",
  },
  main_courtyard: {
    name: "The Main Courtyard",
    region: "Courtyard",
    desc: "An open expanse of cracked flagstones surrounded by the Keep's oppressive walls. A dry fountain stands at the center, its stone figure eroded beyond recognition—though it seems to be reaching upward in supplication or horror. Doors and archways lead in every direction. A well sits in the northeast corner, its stones green with moss.",
    exits: { south: "gatehouse", north: "great_hall", east: "east_garden", west: "west_garden" },
    items: [],
    npcs: ["wounded_knight"],
    firstVisit: "The courtyard is utterly silent. No birds. No wind. Even your footsteps seem muted, as though the stone absorbs sound.",
    search: "Near the fountain's base, coins are scattered—offerings to a forgotten deity. Most are corroded beyond value, but a few gold pieces gleam.",
    searchItems: ["gold_coins"],
  },
  east_garden: {
    name: "The East Garden",
    region: "Courtyard",
    desc: "Once a formal garden, now a tangle of thorned vines and pale, bloated fungi. Stone benches are overturned and cracked. A statue of a woman with no face stands in an alcove, her hands cupped as if holding something long taken. The air here is thick and sweet with decay.",
    exits: { west: "main_courtyard", north: "stables" },
    items: ["healing_herb"],
    enemies: ["feral_hound"],
    search: "Among the fungi, you recognize moonpetals—a rare medicinal herb. They glow faintly in shadow.",
  },
  west_garden: {
    name: "The West Garden",
    region: "Courtyard",
    desc: "Dead trees stand like blackened bones against the grey sky. A cracked sundial shows a time that doesn't match the sun's position—off by exactly six hours, as if measuring time in a different place. The ground is scorched in patches, and nothing grows in those marks.",
    exits: { east: "main_courtyard", north: "training_yard" },
    items: [],
    search: "The scorch marks form a pattern when viewed from above. You can't see it from ground level, but you sense geometry in the destruction.",
  },
  stables: {
    name: "The Ruined Stables",
    region: "Courtyard",
    desc: "Collapsed wooden stalls and rotted hay. Whatever animals were kept here are long gone, but their restraints remain—chains far too heavy for horses. One stall is reinforced with iron bands and has scratch marks on the inside that go inches deep into oak. A tack room in the corner still holds some equipment.",
    exits: { south: "east_garden" },
    items: ["rope", "leather_armor"],
    search: "In the reinforced stall, you find a child's doll made of straw. It has been carefully placed on a small pile of bones.",
  },
  training_yard: {
    name: "The Training Yard",
    region: "Courtyard",
    desc: "A packed-earth yard with wooden training dummies—most shattered. One still stands, bristling with arrows that have been there so long their shafts have petrified. A weapon rack against the wall holds a few salvageable pieces. The marks of countless boots are pressed into the earth, frozen in time.",
    exits: { south: "west_garden" },
    items: ["rusty_sword"],
    search: "Under the weapon rack, tucked behind a loose stone, you find a leather pouch containing a whetstone and oil.",
  },
  great_hall: {
    name: "The Great Hall",
    region: "Ground Floor",
    desc: "A vast chamber with vaulted ceilings lost in shadow. A long banquet table runs its length, set for a feast that was never eaten—plates of petrified food, goblets of dust. Tattered banners hang from the walls, their heraldry: a black tower on a field of flame. Massive hearths at each end hold nothing but cold ash. The hall feels like it's waiting.",
    exits: { south: "main_courtyard", east: "library", west: "kitchen", north: "chapel", up: "grand_staircase" },
    items: [],
    npcs: ["merchant_ghost"],
    firstVisit: "Your entrance disturbs decades of settled dust. It swirls in the thin light like a living curtain, then slowly resettles.",
    search: "Beneath the head of the table, an inscription: 'Lord Aldric Vane, Last of His Line, First of the Hollow.' One goblet contains a residue that smells faintly of almonds.",
  },
  kitchen: {
    name: "The Kitchen",
    region: "Ground Floor",
    desc: "Blackened pots still hang over cold hearths. Knives rust in a block. The pantry door hangs open, and something has been at the stores—tooth marks in petrified bread, claw marks on shelving. A lantern sits on the prep table, its glass intact, oil still sloshing inside. Someone was here recently.",
    exits: { east: "great_hall", north: "pantry", west: "servants_quarters" },
    items: ["lantern"],
    search: "In a drawer: a kitchen knife still sharp, and a note reading 'The new lord takes his meals below. Do not ask what is served.'",
  },
  pantry: {
    name: "The Pantry",
    region: "Ground Floor",
    desc: "Shelves line every wall, floor to ceiling. Most hold dust and mouse skeletons, but some containers are sealed with wax and still intact. The air is cold here—unnaturally cold, your breath misting before you. In the corner, a trapdoor is nailed shut from this side. Whatever is below, someone wanted it to stay there.",
    exits: { south: "kitchen" },
    items: ["healing_potion", "bread"],
    search: "You find sealed jars of preserves, still edible after centuries. The wax seals bear the tower-and-flame sigil. Behind one shelf, a loose stone reveals a small compartment holding a vial of viscous green liquid.",
    searchItems: ["antidote"],
  },
  servants_quarters: {
    name: "The Servants' Quarters",
    region: "Ground Floor",
    desc: "Rows of narrow cots in a low-ceilinged room. Personal effects are scattered about—a hairbrush, a tin soldier, a prayer book open to a page about protection from evil. The last cot by the wall has been converted into a makeshift desk. Notes and diagrams cover its surface, held down by a human skull used as a paperweight.",
    exits: { east: "kitchen" },
    items: ["alchemist_notes"],
    search: "The notes are alchemical formulas. One is circled repeatedly: 'Moonpetal + Holy Water = Antidote of Warding. Purifies corruption of shadow.' Another reads: 'The hidden laboratory is behind the reading nook. Push the red binding.'",
  },
  library: {
    name: "The Library",
    region: "Ground Floor",
    desc: "Towering shelves of books stretch into darkness above. Many volumes have decayed to mulch, but others are preserved—bound in materials that resist time. The smell of old paper and leather is overwhelming. A reading area with armchairs sits near a cold fireplace. The shelves are organized by a system you don't recognize—the categories seem to include 'Things That Were', 'Things That Are', and 'Things That Should Not Be'.",
    exits: { west: "great_hall", north: "reading_nook" },
    items: ["ancient_tome"],
    npcs: ["ghost_scribe"],
    firstVisit: "A book falls from a shelf as you enter, landing open at your feet. The visible page reads: 'And so the Keep was not built but summoned, called from the space between by Lord Vane's desperate pact.'",
    search: "You find several books of note: 'A History of the Vane Dynasty', 'Compendium of Shadows', and 'Treatise on the Boundaries Between'. The last one's spine is warm to the touch.",
  },
  reading_nook: {
    name: "The Reading Nook",
    region: "Ground Floor",
    desc: "A small alcove off the library, furnished with a desk and a high-backed chair. Candles in iron holders line the walls, long since burned to nubs. The desk holds an inkwell (dry) and quills (brittle). A shelf of identically bound red books covers the east wall—their spines are blank. One binding is slightly different from the rest, its leather a deeper shade of crimson.",
    exits: { south: "library" },
    items: ["journal_page_2"],
    hiddenExits: { east: "hidden_passage" },
    hiddenExitHint: "push red",
    hiddenExitRevealed: false,
    search: "The desk drawers contain correspondence between Lord Vane and an unnamed 'Master' discussing a ritual. The last letter reads: 'The Scepter will anchor the Keep between worlds. The cost is everything.'",
  },
  hidden_passage: {
    name: "The Hidden Passage",
    region: "Ground Floor",
    desc: "A narrow corridor behind the bookshelf, the air thick with dust undisturbed for ages. The walls are rough-hewn stone, older than the Keep itself—this passage was here before the castle was built around it. Faded murals depict a ritual: figures in robes surrounding a pillar of darkness, their faces ecstatic and terrified in equal measure.",
    exits: { west: "reading_nook", east: "alchemists_lab" },
    items: ["journal_page_5"],
    dark: true,
  },
  alchemists_lab: {
    name: "The Alchemist's Laboratory",
    region: "Ground Floor",
    desc: "A hidden workspace crammed with glass apparatus, copper tubing, and jars of specimens that float in yellowed fluid. A small furnace squats in the corner, cold but ready. Shelves hold labeled ingredients—wolfsbane, lunar salt, rendered shadow, distilled regret. A workbench has a mortar and pestle, recently used. Someone has been here within the last decade.",
    exits: { west: "hidden_passage" },
    items: ["empty_vial", "strength_elixir"],
    npcs: ["mad_alchemist"],
    dark: true,
  },
  chapel: {
    name: "The Chapel of Forgotten Saints",
    region: "Ground Floor",
    desc: "A long nave with rows of stone pews facing an altar of black marble. Stained glass windows depict not saints but astronomical events—eclipses, comets, alignments. The glass still holds color, projecting strange light across the floor. Behind the altar, alcoves hold statues of hooded figures whose features have been deliberately chiseled away. A font of stone holds liquid that might be water.",
    exits: { south: "great_hall", east: "armory" },
    items: ["holy_water"],
    npcs: ["spectral_guardian"],
    firstVisit: "As you enter, the temperature drops sharply. The liquid in the font ripples, though nothing touched it.",
  },
  armory: {
    name: "The Armory",
    region: "Ground Floor",
    desc: "Walls lined with weapon racks, most empty or holding rusted remnants. A suit of plate armor stands in the center on a wooden stand, polished to a mirror shine—impossible given the age of this place. Its visor seems to track you as you move. A locked cage in the corner holds the better weapons, its lock crusted but intact.",
    exits: { west: "chapel", north: "guard_room" },
    items: ["chain_mail", "crossbow"],
    enemies: ["animated_armor"],
    search: "Behind a loose stone in the wall: a quiver of bolts, still usable. The armor stand has a nameplate: 'Sir Aldric Vane the Elder — May He Rest.'",
    searchItems: ["bolts"],
  },
  guard_room: {
    name: "The Guard Room",
    region: "Ground Floor",
    desc: "A spartan chamber where the castle guard once mustered. A heavy table is covered in a permanent game of knucklebones—the pieces are actual knucklebones, human-sized. Weapon pegs line the walls, and a duty roster hangs by the door, its last entry reading only: 'Night watch cancelled. No need. Nothing gets out.' A stairway leads down into darkness.",
    exits: { south: "armory", down: "dungeon_stairs" },
    items: ["iron_key_2", "shield"],
    enemies: ["skeleton_warrior"],
  },
  grand_staircase: {
    name: "The Grand Staircase",
    region: "Upper Floors",
    desc: "A wide marble staircase curves upward, its banister carved with intertwined serpents. Portraits line the ascending wall—the Vane dynasty in descending order of sanity. The first lords look noble, the middle ones haunted, and the last... the last portrait shows a man whose eyes are entirely black, his smile too wide. A plaque reads 'Lord Malachar Vane — He Who Opened the Way'.",
    exits: { down: "great_hall", north: "lords_chamber", west: "gallery", east: "war_room" },
    items: [],
    firstVisit: "As you climb, you notice the portraits' eyes seem to follow you. The last one—Lord Malachar—is smiling directly at where you stand.",
  },
  lords_chamber: {
    name: "The Lord's Chamber",
    region: "Upper Floors",
    desc: "An opulent bedroom gone to ruin. A massive four-poster bed with rotted curtains dominates the room. The vanity mirror is shattered, each shard showing a slightly different reflection—in one, the room appears occupied. A writing desk holds correspondence sealed with the Vane sigil. The fireplace mantle displays a coat of arms and a portrait of a woman with kind eyes.",
    exits: { south: "grand_staircase", east: "ladys_chamber" },
    items: ["lords_signet", "journal_page_3", "map_fragment"],
    search: "In the desk drawer, a letter: 'My dearest Elara, if you read this, I have failed. The Scepter consumes all who wield it. Take our child and flee. Do not look back. — Aldric.' It was never sent.",
  },
  ladys_chamber: {
    name: "The Lady's Chamber",
    region: "Upper Floors",
    desc: "A woman's quarters, preserved with eerie perfection. Fresh flowers—impossible—sit in a vase on the nightstand. The bed is made, clothes laid out as if their owner merely stepped away. A music box on the dresser plays three notes when you enter, then falls silent. The wardrobe is open, revealing gowns that smell faintly of lavender. A child's cradle sits in the corner, rocking gently.",
    exits: { west: "lords_chamber" },
    items: ["gemstone", "silver_mirror"],
    firstVisit: "The cradle stops rocking the moment you look directly at it.",
    search: "Inside the music box, beneath the mechanism: a small key wrapped in a note reading 'For the garden gate, should you need to escape what he has become.'",
  },
  gallery: {
    name: "The Portrait Gallery",
    region: "Upper Floors",
    desc: "A long corridor of portraits and display cases. The artwork chronicles the Keep's history—or perhaps its future. Early paintings show construction, prosperity, feasts. Later ones grow dark: a tower struck by lightning, a courtyard full of kneeling figures, a door opening onto absolute blackness. The final painting is covered with a cloth. Display cases hold curiosities: a compass that always points down, a clock running backward.",
    exits: { east: "grand_staircase", up: "tower_stairs" },
    items: ["journal_page_4"],
    search: "You pull the cloth from the final painting. It shows this room, this moment, from above—and in the painting, a figure is looking up at you. You quickly cover it again.",
  },
  war_room: {
    name: "The War Room",
    region: "Upper Floors",
    desc: "A round chamber with a massive table at its center, carved to show the surrounding lands in relief. Tiny figures mark army positions for a battle that was never fought—or perhaps one that is still coming. Battle plans and tactical documents are pinned to every wall. One map shows the Keep's lower levels in detail, with a section circled in red ink labeled 'DO NOT BREACH'.",
    exits: { west: "grand_staircase" },
    items: ["battle_plans"],
    search: "The tactical documents reveal the Keep was designed as both fortress and prison. It was built to contain something beneath it, not to defend against external threats. One memo: 'The dungeons are not dungeons. They are a lid.'",
  },
  tower_stairs: {
    name: "The Tower Stairway",
    region: "Upper Floors",
    desc: "A tight spiral staircase ascending the keep's tallest tower. Arrow slits let in thin blades of grey light. The stairs are worn concave by centuries of footsteps, all ascending—the treads on the descent side are unworn. Whoever climbed here rarely came back down. Wind howls through the gaps in the masonry.",
    exits: { down: "gallery", up: "observatory" },
    items: [],
  },
  observatory: {
    name: "The Observatory",
    region: "Upper Floors",
    desc: "The tower's peak, open to the sky through a retractable dome mechanism long since jammed half-open. A brass telescope of extraordinary craftsmanship points at a patch of sky that holds no notable stars—or rather, it points at the space between stars. Star charts cover the walls, annotated in a cramped hand. The view from up here should show the surrounding moors, but instead you see only fog in every direction, as if the Keep floats in a void.",
    exits: { down: "tower_stairs" },
    items: ["star_chart"],
    firstVisit: "You look through the telescope and see—briefly—something looking back. You pull away. When you look again, it shows only empty sky.",
    search: "The star charts mark a constellation called 'The Open Door'—six stars in a hexagonal pattern. Notes read: 'Alignment occurs once per century. Next: NOW.' The word 'NOW' is underlined so hard the quill tore through the paper.",
  },
  dungeon_stairs: {
    name: "The Dungeon Stairs",
    region: "The Dungeons",
    desc: "Rough-cut steps descend into cold darkness. The walls are slick with moisture and something else—a luminescent slime that pulses faintly, like a heartbeat. Iron rings are set into the walls at intervals, trailing fragments of chain. The temperature drops with each step. From below, a sound: not quite breathing, not quite wind. Something between.",
    exits: { up: "guard_room", north: "torture_chamber", east: "cell_block" },
    items: [],
    dark: true,
    firstVisit: "Your light pushes against the darkness here as if it has weight. The shadows don't simply retreat—they compress.",
  },
  torture_chamber: {
    name: "The Torture Chamber",
    region: "The Dungeons",
    desc: "A room of iron and suffering. Implements of cruelty line the walls—some recognizable, others designed for anatomies that aren't quite human. A rack stands in the center, its leather straps still bearing impressions. The drain in the floor is crusted with centuries of dark residue. An iron maiden in the corner stands slightly ajar.",
    exits: { south: "dungeon_stairs", down: "flooded_passage" },
    items: ["iron_hook"],
    dark: true,
    search: "Inside the iron maiden: not spikes, but mirrors. Hundreds of tiny mirrors lining the interior, each angled differently. It wasn't designed to kill. It was designed to show you something.",
  },
  cell_block: {
    name: "The Cell Block",
    region: "The Dungeons",
    desc: "A row of iron-barred cells, most standing open and empty. Straw bedding has composted to black earth. Names and tallies are scratched into every surface—some counting days, others counting something else. One cell in the middle is still locked, and from within comes the sound of breathing. A figure shifts in the darkness.",
    exits: { west: "dungeon_stairs" },
    items: [],
    npcs: ["imprisoned_thief"],
    dark: true,
    locked: true,
    lockKey: "iron_key",
    search: "The cell walls are covered in scratched messages. One recurring phrase: 'IT REMEMBERS YOUR NAME.' Another, in different handwriting: 'The thief knows the way.'",
  },
  flooded_passage: {
    name: "The Flooded Passage",
    region: "The Dungeons",
    desc: "The corridor slopes downward into black water that reaches your knees. The water is cold—impossibly cold—and utterly still until disturbed. Your movements send ripples that don't behave naturally, rebounding from walls that are closer than they appear. Things brush against your legs beneath the surface. Not fish. Fish would be a comfort.",
    exits: { up: "torture_chamber", north: "underground_river" },
    items: [],
    enemies: ["cave_spider"],
    dark: true,
    firstVisit: "You feel something wrap around your ankle for a moment, then release. When you look down, the water is as black and featureless as a mirror of obsidian.",
  },
  underground_river: {
    name: "The Underground River",
    region: "The Dungeons",
    desc: "A natural cavern bisected by a slow-moving underground river. The water is clear here, flowing over smooth stones that glow with faint phosphorescence. The sound of the river echoes in ways that suggest the cavern extends much further than your light reveals. A narrow ledge follows the north bank deeper into the earth. Ancient stalactites reach down like grasping fingers.",
    exits: { south: "flooded_passage", north: "catacombs_entrance" },
    items: ["crystal_shard_1"],
    search: "In the shallows, something glints—a shard of crystal that pulses with inner light. The river seems to flow from no identifiable source, simply emerging from the rock face.",
  },
  catacombs_entrance: {
    name: "The Catacombs Entrance",
    region: "The Dungeons",
    desc: "An arched doorway carved into the living rock, flanked by pillars of stacked skulls cemented with ancient mortar. The skulls are arranged with care—eye sockets facing outward, jawbones aligned. Above the arch, in letters picked out with gold leaf that still gleams: 'WHAT SLEEPS BELOW DREAMS OF YOU.' Beyond, corridors branch into darkness. The smell of old bone and dry earth fills your nostrils.",
    exits: { south: "underground_river", north: "catacombs" },
    items: ["bone_flute"],
    dark: true,
    firstVisit: "As you pass under the arch, you feel a sensation like walking through a curtain of cobwebs, though nothing visible touches you.",
  },
  catacombs: {
    name: "The Catacombs",
    region: "The Dungeons",
    desc: "Endless corridors of niches and alcoves, each holding bones arranged in elaborate patterns—mandalas of femurs, rosettes of finger bones, archways of ribcages. The arrangements are too precise, too intentional, to be mere storage of the dead. They're instructions, written in bone. Passages branch in every direction, but the air current pulls steadily north. A side passage to the east is marked with runes that glow faintly blue.",
    exits: { south: "catacombs_entrance", east: "rune_chamber", north: "crypt" },
    items: ["skull_key"],
    enemies: ["wraith"],
    dark: true,
    search: "The bone arrangements, when read as a language, seem to repeat a phrase. You can't read it, but the talking skull in the corner can.",
    npcs: ["talking_skull"],
  },
  rune_chamber: {
    name: "The Rune Chamber",
    region: "The Dungeons",
    desc: "A hexagonal room carved from a single block of dark crystal. Runes are etched into each of the six walls, glowing with a faint blue light that intensifies when approached. The floor is a mosaic depicting six stars in a familiar pattern—the constellation from the observatory charts. In the center, a pedestal holds an indentation shaped for something roughly the size of a fist. The air hums with contained energy.",
    exits: { west: "catacombs" },
    items: ["crystal_shard_2"],
    dark: false,
    puzzle: "rune_puzzle",
    search: "The runes seem to correspond to the star chart from the observatory. The pattern suggests they should be activated in a specific order: the sequence the stars appear during the alignment.",
  },
  crypt: {
    name: "The Crypt of the First Lord",
    region: "The Dungeons",
    desc: "A grand burial chamber dominated by a massive sarcophagus of white marble—the only white stone in the entire Keep. The lid is carved with the likeness of a knight in full plate, hands crossed over a sword. The inscription reads: 'Here lies Aldric Vane the Elder, who built the cage. May his sacrifice hold.' The walls bear murals of the Keep's construction, showing it being built not from the ground up, but from the inside out—as if assembled around something already present.",
    exits: { south: "catacombs", down: "ancient_shrine" },
    items: ["enchanted_ring", "crystal_shard_3"],
    enemies: ["ghoul"],
    dark: true,
    locked: true,
    lockKey: "skull_key",
    lockDir: "down",
    search: "The sarcophagus can be opened. Inside: not a body, but a void—a rectangular window into absolute darkness. At the bottom, something gleams.",
  },
  ancient_shrine: {
    name: "The Ancient Shrine",
    region: "The Deep",
    desc: "This structure predates the Keep by millennia. Cyclopean blocks of stone, fitted without mortar, form a domed chamber. The walls are carved with spirals and eyes—thousands of eyes, rendered in exquisite detail. At the center, a stone altar holds a shallow basin filled with liquid shadow that moves like mercury. The air here is heavy with power. You can feel it pressing against your thoughts.",
    exits: { up: "crypt", north: "shadow_halls" },
    items: ["amulet_of_warding"],
    npcs: ["ancient_spirit"],
    dark: false,
    firstVisit: "The eyes on the walls seem to blink, one by one, as if waking from a long sleep.",
  },
  shadow_halls: {
    name: "The Shadow Halls",
    region: "The Deep",
    desc: "Corridors where darkness is not merely an absence of light but a presence—thick and almost liquid. Your light source creates a small bubble of reality around you, beyond which shapes move with purpose. The architecture here follows no human logic: stairs that lead sideways, doors that open onto walls, corridors that loop back on themselves. Reality is thin here, and something else bleeds through.",
    exits: { south: "ancient_shrine", north: "abyssal_chamber" },
    items: [],
    enemies: ["shadow_knight"],
    dark: true,
    firstVisit: "You hear your own voice ahead of you in the darkness, speaking words you haven't said yet. You walk faster.",
  },
  abyssal_chamber: {
    name: "The Abyssal Chamber",
    region: "The Deep",
    desc: "A vast cavern—or perhaps not a cavern at all, but the interior of something alive. The walls pulse with a slow rhythm. The floor is glass-smooth obsidian reflecting a sky full of unfamiliar stars beneath your feet. At the far end, the passage narrows to a single doorway carved with the Vane sigil—but inverted, the tower falling, the flames reaching downward. Beyond it, you sense something ancient and aware. It knows you are here. It has been waiting.",
    exits: { south: "shadow_halls", north: "throne_of_shadows" },
    items: [],
    dark: false,
    firstVisit: "The stars beneath the glass floor shift as you walk. They are tracking you.",
  },
  throne_of_shadows: {
    name: "The Throne of Shadows",
    region: "The Deep",
    desc: "The heart of the Keep. A cathedral-sized chamber of black stone, its ceiling lost in perpetual darkness. At its center, on a dais of fused obsidian, sits a throne carved from a single piece of shadow—solid darkness given form. Upon the throne rests the Scepter of Aethon, a rod of twisted metal and crystal that radiates palpable wrongness. The air around it shimmers. Before the throne stands a figure in armor of living shadow, motionless, waiting.",
    exits: { south: "abyssal_chamber" },
    items: [],
    enemies: ["shadow_lord"],
    dark: false,
    firstVisit: "The figure speaks without turning: 'Another moth to my flame. Tell me—do you seek the Scepter, or does it seek you?'",
  },
  sanctum: {
    name: "The Sanctum",
    region: "The Deep",
    desc: "Beyond the throne, hidden by its shadow, a small chamber of perfect white stone—startlingly bright after the darkness. In the center, a pedestal holds an ancient crown of silver and starlight. The walls are covered in writing—not carved but grown, like crystal formations—in a language that predates human speech. Somehow, you can read it. It says: 'The Keep is the door. The Scepter is the key. You are the choice.'",
    exits: { south: "throne_of_shadows" },
    items: ["ancient_crown"],
    dark: false,
  },
};

// === ITEMS ===

const ITEMS = {
  torch: { name: "Torch", desc: "A wooden torch wrapped in oil-soaked rags. It burns with a steady amber flame.", type: "tool", light: true, equippable: true, slot: "light" },
  lantern: { name: "Lantern", desc: "A brass lantern with intact glass. Its oil reservoir is half full. Provides steadier light than a torch.", type: "tool", light: true, equippable: true, slot: "light" },
  rusty_sword: { name: "Rusty Sword", desc: "A sword well past its prime, but still sharp enough to cut. The blade is pitted with age.", type: "weapon", attack: 3, equippable: true, slot: "weapon" },
  silver_dagger: { name: "Silver Dagger", desc: "A dagger of pure silver, etched with protective sigils. Especially effective against the undead.", type: "weapon", attack: 5, undeadBonus: 5, equippable: true, slot: "weapon" },
  enchanted_blade: { name: "Enchanted Blade", desc: "A longsword that hums with power. The blade shimmers between visibility and transparency, as if it exists in two places at once.", type: "weapon", attack: 12, equippable: true, slot: "weapon" },
  crossbow: { name: "Crossbow", desc: "A heavy crossbow of dark wood and iron. Requires bolts to fire.", type: "weapon", attack: 8, requiresAmmo: "bolts", equippable: true, slot: "weapon" },
  bolts: { name: "Crossbow Bolts", desc: "A quiver of iron-tipped bolts. About a dozen remain.", type: "ammo", count: 12 },
  leather_armor: { name: "Leather Armor", desc: "Hardened leather cuirass, still serviceable. Won't stop a heavy blow but better than cloth.", type: "armor", defense: 3, equippable: true, slot: "armor" },
  chain_mail: { name: "Chain Mail", desc: "A shirt of interlocking iron rings, heavy but protective. The links are stamped with the Vane sigil.", type: "armor", defense: 6, equippable: true, slot: "armor" },
  shadow_plate: { name: "Shadow Plate", desc: "Armor forged from crystallized shadow. It weighs almost nothing and seems to absorb light. It whispers when worn.", type: "armor", defense: 10, equippable: true, slot: "armor" },
  shield: { name: "Iron Shield", desc: "A battered but solid iron shield bearing the faded emblem of the Keep's guard.", type: "armor", defense: 2, equippable: true, slot: "offhand" },
  healing_potion: { name: "Healing Potion", desc: "A vial of luminous red liquid that smells of herbs and honey. Restores vitality.", type: "consumable", healing: 40 },
  healing_herb: { name: "Moonpetal", desc: "A pale flower that glows faintly in darkness. Known for its healing and purifying properties.", type: "ingredient" },
  holy_water: { name: "Holy Water", desc: "Water from the chapel font, blessed by whatever saints once watched over this place. Burns the unholy.", type: "consumable", damage: 30, undeadOnly: true },
  antidote: { name: "Antidote", desc: "A bitter green tincture that purges poison and corruption from the body.", type: "consumable", curesPoison: true },
  strength_elixir: { name: "Strength Elixir", desc: "A shimmering golden liquid. Temporarily enhances physical power.", type: "consumable", tempAttack: 5, duration: 3 },
  bread: { name: "Stale Bread", desc: "Rock-hard bread preserved by the pantry's unnatural cold. Barely edible but sustaining.", type: "consumable", healing: 5 },
  rope: { name: "Rope", desc: "Fifty feet of strong hemp rope, coiled and ready. Useful for climbing, binding, or descending.", type: "tool" },
  iron_hook: { name: "Iron Hook", desc: "A cruel iron hook from the torture chamber. Could be combined with rope for climbing.", type: "tool" },
  grappling_hook: { name: "Grappling Hook", desc: "A rope with an iron hook firmly attached. Perfect for climbing or crossing gaps.", type: "tool", combinedFrom: ["rope", "iron_hook"] },
  lockpicks: { name: "Lockpicks", desc: "A set of slender metal tools for defeating locks. Well-worn but effective.", type: "tool" },
  iron_key: { name: "Iron Key", desc: "A heavy iron key, cold to the touch. A tag reads 'CELLS'.", type: "key" },
  iron_key_2: { name: "Dungeon Key", desc: "A large key on a ring, labeled 'LOWER LEVELS' in faded script.", type: "key" },
  skull_key: { name: "Skull Key", desc: "A key carved from bone, its bow shaped like a screaming skull. It vibrates faintly, as if alive.", type: "key" },
  lords_signet: { name: "Lord's Signet Ring", desc: "A heavy gold ring bearing the Vane coat of arms. It serves as both seal and key to the lord's private chambers.", type: "key" },
  crystal_shard_1: { name: "Crystal Shard (River)", desc: "A fragment of translucent crystal that pulses with blue-white light. Found in the underground river. It feels incomplete.", type: "quest" },
  crystal_shard_2: { name: "Crystal Shard (Runes)", desc: "A fragment of dark crystal that hums with energy. Found in the rune chamber. It feels incomplete.", type: "quest" },
  crystal_shard_3: { name: "Crystal Shard (Crypt)", desc: "A fragment of crystal that shifts between light and dark. Found in the crypt. It feels incomplete.", type: "quest" },
  crystal_key: { name: "Crystal Key", desc: "Three crystal shards fused into a single key that exists in multiple states simultaneously. It unlocks the boundary between worlds.", type: "key", combinedFrom: ["crystal_shard_1", "crystal_shard_2", "crystal_shard_3"] },
  ancient_tome: { name: "Ancient Tome", desc: "A heavy book bound in dark leather. Its pages contain the ritual that summoned the Keep and the theory behind the Scepter's power. One chapter describes a 'Word of Sundering' that can destroy shadow constructs.", type: "lore", teachesSpell: "sunder" },
  journal_page_1: { name: "Journal Page (I)", desc: "A torn page: '...arrived at the moor's edge. The locals speak of the Keep in whispers. They say it appeared overnight, fully formed, as if grown from the earth. I must investigate...'", type: "lore", journalIndex: 1 },
  journal_page_2: { name: "Journal Page (II)", desc: "A torn page: '...the library holds secrets. The scribe—or his ghost—guards them jealously. He speaks of five pages torn from the master journal, scattered by the last lord in his madness...'", type: "lore", journalIndex: 2 },
  journal_page_3: { name: "Journal Page (III)", desc: "A torn page: '...Lord Vane's confession. He did not build the Keep. He summoned it from between worlds using the Scepter of Aethon. But the Scepter demanded a price: the Keep would exist in both worlds simultaneously, and what lived in the other world would seep through...'", type: "lore", journalIndex: 3 },
  journal_page_4: { name: "Journal Page (IV)", desc: "A torn page: '...the Shadow Lord is not a person but a role. Whoever holds the Scepter becomes the Shadow Lord, bound to the throne, neither alive nor dead. Vane took up the Scepter to seal the breach but became the very thing he sought to contain...'", type: "lore", journalIndex: 4 },
  journal_page_5: { name: "Journal Page (V)", desc: "A torn page: '...there is another way. The Sanctum behind the throne holds the Crown of Endings. With it, one can close the door permanently—destroy the Scepter, banish the Keep, seal the breach. But the price is the same: someone must wear the crown and stay behind as the door closes. A willing sacrifice to lock the cage forever...'", type: "lore", journalIndex: 5 },
  map_fragment: { name: "Map Fragment", desc: "A partial map of the Keep's lower levels, drawn in Lord Vane's hand. It shows a passage behind the reading nook bookshelf, activated by pulling a red-bound book.", type: "lore" },
  alchemist_notes: { name: "Alchemist's Notes", desc: "Detailed notes on potions and tinctures. Key recipe: 'Moonpetal + Holy Water = Antidote of Warding (cures shadow corruption)'. Also: 'The laboratory is hidden behind the reading nook. Push the crimson binding.'", type: "lore" },
  battle_plans: { name: "Battle Plans", desc: "Tactical documents revealing the Keep was built not as a fortress but as a containment structure. The dungeons were designed to cage what lies below.", type: "lore" },
  star_chart: { name: "Star Chart", desc: "Astronomical charts showing a constellation called 'The Open Door.' Notes indicate the runes in the deep should be activated following the stars' order during alignment: North, East, South.", type: "lore" },
  amulet_of_warding: { name: "Amulet of Warding", desc: "A heavy amulet of unknown metal, warm to the touch. It creates a barrier against shadow and corruption. Essential for facing the Shadow Lord.", type: "accessory", equippable: true, slot: "amulet", shadowProtection: true },
  enchanted_ring: { name: "Enchanted Ring", desc: "A ring of pale gold set with a stone that shifts color with your heartbeat. It quickens reflexes and sharpens the mind.", type: "accessory", equippable: true, slot: "ring", defense: 2, attack: 2 },
  scepter_of_aethon: { name: "Scepter of Aethon", desc: "The artifact that anchors the Keep between worlds. It pulses with dark energy, whispering promises of power. To hold it is to feel the weight of two realities pressing against each other.", type: "quest" },
  ancient_crown: { name: "Crown of Endings", desc: "A crown of woven silver threads and captured starlight. It is the key to closing the door between worlds—permanently. Its weight is not physical but existential.", type: "quest" },
  gold_coins: { name: "Gold Coins", desc: "A handful of ancient gold coins stamped with the Vane sigil. Still valuable, if you ever leave this place.", type: "treasure", value: 25 },
  gemstone: { name: "Crimson Gemstone", desc: "A deep red stone that seems to contain a flickering light. It pulses warmly in your hand.", type: "treasure", value: 50 },
  silver_mirror: { name: "Silver Mirror", desc: "A hand mirror of polished silver. Your reflection moves a fraction of a second after you do.", type: "tool" },
  bone_flute: { name: "Bone Flute", desc: "A flute carved from a single human bone, etched with spiraling runes. When played, it produces a haunting melody that calms restless spirits.", type: "tool" },
  empty_vial: { name: "Empty Vial", desc: "A glass vial, clean and ready to be filled.", type: "tool" },
};

// === NPCS ===

const NPCS = {
  wounded_knight: {
    name: "Wounded Knight",
    desc: "A knight in battered plate armor slumps against the fountain, clutching a wound in his side. His tabard bears a crest you don't recognize—not the Vanes. His eyes are alert despite his pain.",
    greeting: "The knight looks up, grimacing. 'Another fool... seeking the Scepter, I wager. I was the same, three days ago. Before the thing in the guard room...'",
    topics: {
      keep: "'This place... it isn't right. The geometry shifts when you're not looking. Corridors that were straight become curved. I've mapped what I could, but the lower levels...' He shudders.",
      scepter: "'The Scepter of Aethon. Said to command shadow and flame. What they don't tell you is the price. Everyone who's touched it has become... part of this place.'",
      wound: "'A skeleton in the guard room. Sounds absurd, doesn't it? But this one fought with intelligence, with memory. It knew techniques. Old techniques.' He winces. 'I need a healing potion, or I'm done.'",
      shadow: "'The Shadow Lord... I've heard his voice echoing up from below. He was a man once. Lord Vane himself, they say. Took up the Scepter to save his family and lost everything.'",
      help: "'A healing potion would save my life. I saw one in the pantry, if the rats haven't gotten to it. Bring it to me and I'll tell you everything I know about the lower levels.'",
    },
    quest: {
      id: "heal_knight",
      name: "Heal the Wounded Knight",
      requires: "healing_potion",
      active: false,
      completed: false,
      onComplete: "The knight drinks deeply. Color returns to his face. 'You have my thanks.' He stands, testing his weight. 'The dungeon stairs—there's a skeleton warrior guarding them. It fights like a trained soldier. Use feints. It anticipates direct attacks but can't adapt to misdirection. And in the catacombs...' He lowers his voice. 'Bring silver. Steel means nothing to what walks there.' He presses something into your hand: a key.",
      reward: ["iron_key_2"],
      rewardText: "The knight gives you a dungeon key and shares tactical knowledge. Your combat effectiveness increases.",
      statBonus: { attack: 2 },
    },
  },
  ghost_scribe: {
    name: "Ghost of the Scribe",
    desc: "A translucent figure hunches over a reading desk, eternally writing in a book that doesn't exist. His robes mark him as a scholar. His expression is one of desperate concentration.",
    greeting: "'Can you see me? Truly see me? So few can.' The ghost's quill pauses. 'I am—was—Cedric, keeper of the Vane records. I've been trying to write the truth for... how long has it been? My journal. He tore it apart—Lord Malachar. Scattered the pages. Five pages. If you could find them...'",
    topics: {
      journal: "'My journal held the truth about the Keep—how it was summoned, what it contains, how it might be undone. Lord Malachar feared that truth. He tore out the five key pages and scattered them throughout the Keep.'",
      vane: "'The Vane dynasty built their fortune on the Scepter. Each lord wielded it, each was consumed by it. The last—Malachar—opened the way fully. He became the Shadow Lord. Or perhaps the Shadow Lord consumed him. The distinction may not matter.'",
      keep: "'The Keep exists in two worlds simultaneously. What you see is the echo in your world. The true Keep is... elsewhere. The Scepter is the anchor. Remove or destroy it, and both versions collapse.'",
      help: "'Find my five journal pages. They're scattered through the Keep. Bring them to me and I can teach you the Word of Sundering—a spell that disrupts shadow constructs. You'll need it below.'",
    },
    quest: {
      id: "find_pages",
      name: "Collect the Five Journal Pages",
      requires: ["journal_page_1", "journal_page_2", "journal_page_3", "journal_page_4", "journal_page_5"],
      active: false,
      completed: false,
      onComplete: "'Yes... YES! The truth, whole again!' Cedric's form brightens, becoming almost solid. He reads through the pages, his expression shifting from relief to sorrow. 'It is as I feared. The only way to truly end this is sacrifice. But first—the Word of Sundering.' He speaks a word that bypasses your ears and embeds directly in your mind. You know it now, instinctively. 'Use it wisely. It disrupts anything made of shadow.'",
      reward: [],
      rewardText: "Cedric teaches you the Word of Sundering spell.",
      teachesSpell: "sunder",
    },
  },
  imprisoned_thief: {
    name: "Imprisoned Thief",
    desc: "A wiry figure in dark clothing crouches in the locked cell. Sharp eyes evaluate you from the shadows. Despite apparent captivity, there's no fear in those eyes—only calculation.",
    greeting: "'Well, well. A living soul in this tomb. I don't suppose you've got a key? Or better yet, lockpicks? No? Then we negotiate.' The thief grins. 'Get me out, and I'll make it worth your while.'",
    topics: {
      name: "'Call me Wren. What I was doing here is my business, but I'll tell you this: I came looking for treasure and found something far worse. The things in the lower levels...'",
      escape: "'I need out of this cell. The key should be somewhere in the gatehouse or guard room. Or if you're skilled, a set of lockpicks might do. Failing that, brute force? These bars look old.'",
      treasure: "'Oh, there's treasure here. More than you could carry. But the real prize is below—and it's guarded by things that don't die when you kill them. I barely made it back to this level before they caught me.'",
      passages: "'I found hidden passages throughout the Keep. Behind the library shelves, there's a laboratory. And I suspect there are more. This place is riddled with secrets.'",
    },
    quest: {
      id: "free_thief",
      name: "Free the Imprisoned Thief",
      requires: "iron_key",
      active: false,
      completed: false,
      onComplete: "'Freedom at last.' Wren stretches like a cat. 'A deal's a deal.' The thief produces a set of lockpicks from a hidden pocket. 'These have gotten me into places you wouldn't believe. They're yours now. And a tip: the bookcase in the reading nook. There's a red-bound book that isn't a book. Push it, and the shelf swings open. You're welcome.'",
      reward: ["lockpicks"],
      rewardText: "Wren gives you lockpicks and reveals the location of a hidden passage.",
      revealsHidden: "reading_nook",
    },
  },
  spectral_guardian: {
    name: "Spectral Guardian",
    desc: "A figure of blue-white light stands before the chapel altar. It wears armor of an ancient design and carries a sword that gleams with silver fire. Its face is stern but not unkind. It radiates an aura of sanctity that pushes back the Keep's pervasive wrongness.",
    greeting: "'Halt, seeker. This chapel is the last sanctified ground in the Keep. I guard it and the weapon it holds. Answer my riddle truthfully, and the Silver Dagger is yours. Lie or fail, and you leave empty-handed.' The guardian raises a gauntleted hand. 'I have cities, but no houses. I have mountains, but no trees. I have water, but no fish. I have roads, but no cars. What am I?'",
    topics: {
      riddle: "'Answer my riddle: I have cities, but no houses. I have mountains, but no trees. I have water, but no fish. I have roads, but no cars. What am I?' (Type 'answer [your answer]' to respond)",
      silver: "'The Silver Dagger was forged in this chapel by the first priest of the Keep. It carries the last blessing this place ever received. Against the undead, it is devastating.'",
      chapel: "'Once, this chapel held back the darkness. Now it is merely a pocket of resistance. The saints whose statues line the walls have turned their faces away. Only I remain.'",
    },
    riddleAnswer: "map",
    riddleSolved: false,
    riddleReward: "silver_dagger",
  },
  mad_alchemist: {
    name: "The Mad Alchemist",
    desc: "An elderly figure in a stained robe, muttering over bubbling apparatus. Their eyes are mismatched—one brown, one entirely white—and they seem to exist at a slight angle to reality, as if not fully in this world.",
    greeting: "'Customers! Or test subjects? Both? Both is good.' The alchemist cackles. 'I've been here for... time is different here. Years? Centuries? The work continues regardless. What do you need? Potions? Poisons? The distinction is mostly dosage.'",
    topics: {
      potions: "'Bring me ingredients and I'll brew what you need. Moonpetal and holy water make an antidote that cures shadow corruption. Very useful if you're going deeper.'",
      shadow: "'Shadow is not darkness. Darkness is the absence of light. Shadow is the presence of something else. The things below are made of it—given form by the Scepter's power. Disrupt the shadow and they unravel.'",
      vane: "'Malachar Vane was my patron. Brilliant man. Terrible judgment. He thought he could control the Scepter where his ancestors failed. Hubris is the alchemist's disease—we all think we can control the reaction.'",
      brew: "'Bring me a Moonpetal and Holy Water together and I'll make you something that'll save your life down there.'",
    },
    canBrew: true,
  },
  merchant_ghost: {
    name: "Ghost Merchant",
    desc: "A portly, translucent figure sits at the head of the banquet table, examining spectral wares only partially visible. Unlike other ghosts here, this one seems cheerful—even content.",
    greeting: "'Ah, a customer! Living, even! How delightful. I am Bartholomew, purveyor of fine goods to adventurers living and dead. My prices are fair, my goods are genuine, and my return policy is eternal.' He chuckles at his own joke.",
    topics: {
      trade: "'Show me what you've got and I'll tell you what it's worth. Gold coins, gemstones—I deal in valuables. In return, I offer supplies that might keep you alive a bit longer.'",
      wares: "'Healing potions, mostly. The living always need those. I also have information, which in this place is worth more than gold.'",
      keep: "'I died here decades ago. Fell down the dungeon stairs, if you can believe it. Not a glamorous death. But business is business, and the dead need commerce as much as the living. More, even. What else is there to do?'",
    },
    canTrade: true,
    inventory: {
      healing_potion: 30,
      antidote: 40,
      torch: 10,
    },
  },
  talking_skull: {
    name: "Talking Skull",
    desc: "A human skull resting on a shelf of other skulls, distinguished only by the faint green glow in its eye sockets and the fact that it won't shut up.",
    greeting: "'Oh wonderful, another hero. Let me guess—you're here for the Scepter. Everyone's here for the Scepter. Nobody's here for the charming company. Nobody asks how the skull is doing. Fine, thanks for asking.'",
    topics: {
      catacombs: "'The bone arrangements aren't random. They're a warning, a history, and a map all at once. The skulls face the safe paths. The ribcages arch over danger. Read the bones and you'll survive. Probably.'",
      wraith: "'The wraith down here was the Keep's chaplain, if you can believe it. Holy man gone very unholy. Silver hurts it. Holy water destroys it. Regular weapons just make it angry, and trust me, you don't want an angry wraith.'",
      skull_key: "'Yes, I know where it is. It's in the bone mandala three alcoves north, behind the left femur of the third row. What? I've had centuries to memorize this place. Not like I can go anywhere.'",
      self: "'I was an adventurer like you. Then I took an arrow to the—well, everything, really. Now I'm a skull. It's not all bad. No headaches, no hangovers, rent-free living. The conversation's a bit one-sided, though.'",
      scepter: "'The Scepter doesn't grant power. It IS power—borrowed from the other side. Whoever wields it becomes a conduit. Eventually the power flows through you so completely that there's nothing left of you. Just the flow.'",
    },
  },
  ancient_spirit: {
    name: "Ancient Spirit",
    desc: "Not a ghost but something older—a presence without form, felt rather than seen. The air in the shrine thickens around a central point, and when it speaks, the words appear in your mind rather than your ears.",
    greeting: "A pressure builds behind your eyes. Words form, not heard but understood: 'YOU COME TO THE OLD PLACE. SEEKER. THIEF. FOOL. WHICH ARE YOU?' A pause. 'PERHAPS ALL THREE. SPEAK YOUR PURPOSE.'",
    topics: {
      purpose: "'IF YOU SEEK THE SCEPTER TO WIELD IT, YOU ARE A FOOL. IF YOU SEEK TO DESTROY IT, YOU ARE BRAVE. IF YOU SEEK TO UNDERSTAND IT, YOU ARE WISE. THE AMULET PROTECTS AGAINST THE SHADOW\\'S CORRUPTION. TAKE IT. YOU WILL NEED IT.'",
      shrine: "'THIS PLACE WAS OLD WHEN YOUR SPECIES WAS YOUNG. THE DOOR BETWEEN WORLDS HAS ALWAYS BEEN HERE. THE KEEP WAS BUILT UPON IT, A CAGE AROUND A WOUND IN REALITY. THE SCEPTER HOLDS THE CAGE SHUT—AND PRIES IT OPEN.'",
      amulet: "'THE AMULET OF WARDING SHIELDS THE MIND FROM SHADOW\\'S TOUCH. WITHOUT IT, THE SHADOW LORD WILL CONSUME YOUR WILL BEFORE YOUR BODY. WITH IT, YOU HAVE A CHANCE. A CHANCE IS MORE THAN MOST RECEIVE.'",
      crown: "'THE CROWN OF ENDINGS LIES BEYOND THE THRONE. IT IS THE OTHER CHOICE—NOT POWER, BUT SACRIFICE. WITH THE CROWN, ONE CAN CLOSE THE DOOR FOREVER. BUT THE BEARER STAYS BEHIND, BECOMING THE FINAL SEAL.'",
    },
  },
};

// === ENEMIES ===

const ENEMIES = {
  giant_rats: { name: "Giant Rats", desc: "A pack of rats the size of dogs, eyes gleaming red in the darkness. Their fur is matted with something dark and their teeth are too long.", hp: 15, maxHp: 15, attack: 3, defense: 1, xp: 10, gold: 0, loot: null, undead: false,
    attackMsg: "The rats swarm and bite!", defeatMsg: "The rats scatter, squealing, into the darkness." },
  feral_hound: { name: "Feral Hound", desc: "A massive hound with slavering jaws and eyes that glow with unnatural intelligence. Its fur is patchy, revealing grey skin beneath.", hp: 30, maxHp: 30, attack: 6, defense: 2, xp: 15, gold: 0, loot: null, undead: false,
    attackMsg: "The hound lunges with snapping jaws!", defeatMsg: "The hound collapses with a final whimper, its glowing eyes fading to dark." },
  skeleton_warrior: { name: "Skeleton Warrior", desc: "The animated bones of a soldier, still wearing fragments of armor. It fights with terrible precision, muscle memory encoded in bone.", hp: 45, maxHp: 45, attack: 9, defense: 5, xp: 25, gold: 10, loot: null, undead: true,
    attackMsg: "The skeleton strikes with practiced precision!", defeatMsg: "The bones clatter apart and the animating force dissipates like smoke." },
  animated_armor: { name: "Animated Armor", desc: "The suit of plate armor steps off its stand, moving with grinding precision. No body inhabits it—only will.", hp: 55, maxHp: 55, attack: 10, defense: 8, xp: 30, gold: 0, loot: null, undead: false,
    attackMsg: "The armor swings a massive gauntleted fist!", defeatMsg: "The armor freezes mid-swing, then collapses into a pile of inert metal." },
  cave_spider: { name: "Cave Spider", desc: "A spider the size of a large dog, pale and blind, sensing prey through vibration. Venom drips from its mandibles.", hp: 35, maxHp: 35, attack: 7, defense: 3, xp: 20, gold: 0, loot: null, undead: false, poisonous: true,
    attackMsg: "The spider strikes with venomous fangs!", defeatMsg: "The spider curls in on itself, legs twitching, then goes still." },
  ghoul: { name: "Ghoul", desc: "A hunched figure with too-long limbs and a mouth of needle teeth. It was human once. Now it is hunger given form.", hp: 55, maxHp: 55, attack: 12, defense: 6, xp: 35, gold: 15, loot: null, undead: true,
    attackMsg: "The ghoul rakes with filthy claws!", defeatMsg: "The ghoul screams—a sound almost like words—and dissolves into dark mist." },
  wraith: { name: "Wraith", desc: "A shape of concentrated darkness in the form of a robed figure. Where its face should be, there is only void. Cold radiates from it in waves.", hp: 65, maxHp: 65, attack: 14, defense: 3, xp: 40, gold: 0, loot: null, undead: true, physicalResist: true,
    attackMsg: "The wraith's touch drains your life force!", defeatMsg: "The wraith shrieks—a sound like tearing silk—and unravels into wisps of shadow." },
  shadow_knight: { name: "Shadow Knight", desc: "A towering figure in armor of living shadow. It moves with fluid grace, its blade trailing darkness. The Shadow Lord's champion.", hp: 85, maxHp: 85, attack: 16, defense: 10, xp: 55, gold: 0, loot: "shadow_plate", undead: false, shadowBeing: true,
    attackMsg: "The Shadow Knight's blade cuts through reality itself!", defeatMsg: "The Shadow Knight kneels, its form flickering. 'You are... worthy,' it whispers, and dissolves. Its armor remains, solidified from shadow to substance." },
  shadow_lord: { name: "The Shadow Lord", desc: "Lord Malachar Vane—or what remains of him. A figure of absolute authority wreathed in living darkness. His eyes are voids that pull at your consciousness. His voice echoes from everywhere and nowhere.", hp: 150, maxHp: 150, attack: 20, defense: 12, xp: 100, gold: 0, loot: "scepter_of_aethon", undead: false, shadowBeing: true, boss: true, regenerates: true,
    attackMsg: "The Shadow Lord unleashes a wave of pure darkness!", defeatMsg: "The Shadow Lord staggers. The darkness around him flickers. 'You... understand nothing...' he rasps. 'The Scepter... is not a weapon... it is a SEAL...' He collapses, and the Scepter clatters to the ground, pulsing with terrible energy." },
};

// === CHRONICLE DATA ===

const ADVENTURER_NAMES = [
  "Wanderer_42","SilverFox","Thornwick","Lady_Moonfall","Grimjaw_III",
  "Questborne","DarkWanderer","Ashknight","RuneSeeker","Stormcrow",
  "Daggerfall","Nightwhisper","IronVeil","ShadowPine","Frostbane",
  "Emberwolf","Goldenthorn","Ravencrest","Windwalker","Oakenshield",
  "BloodRaven","Silentblade","MistWalker","Hexbound","GhostPetal",
  "Crowfeather","Duskmire","StarAnvil","Ashgrove","Ironquill"
];

const CHRONICLE_EVENTS = [
  { action: "fell to the Wraith in the Catacombs", type: "death" },
  { action: "was slain by the Shadow Knight", type: "death" },
  { action: "perished at the Shadow Lord's hand", type: "death" },
  { action: "was devoured by giant rats on the moor", type: "death" },
  { action: "drowned in the flooded passage", type: "death" },
  { action: "succumbed to spider venom", type: "death" },
  { action: "discovered the Hidden Passage", type: "discover" },
  { action: "found the Alchemist's Laboratory", type: "discover" },
  { action: "reached the Ancient Shrine", type: "discover" },
  { action: "entered the Shadow Halls", type: "discover" },
  { action: "solved the Chapel Riddle", type: "discover" },
  { action: "collected all five Journal Pages", type: "discover" },
  { action: "freed the imprisoned thief", type: "discover" },
  { action: "healed the wounded knight", type: "discover" },
  { action: "is exploring the Dungeons", type: "active" },
  { action: "is battling skeletons in the Guard Room", type: "active" },
  { action: "is reading in the Library", type: "active" },
  { action: "is navigating the Catacombs", type: "active" },
  { action: "is descending the Dungeon Stairs", type: "active" },
  { action: "carved a rune on the Wall", type: "rune" },
  { action: "left a warning near the bridge", type: "rune" },
  { action: "defeated the Animated Armor", type: "discover" },
  { action: "claimed the Silver Dagger", type: "discover" },
  { action: "has entered the Throne of Shadows", type: "active" },
  { action: "brewed a potion with the Alchemist", type: "discover" },
];

const RUNE_WALL_MESSAGES = [
  { text: "Beware the third corridor. The bones lie.", author: "Greymantle" },
  { text: "Steel is useless below the river. Bring silver or don't come at all.", author: "Thornwick" },
  { text: "The alchemist can be trusted. Mostly.", author: "RuneSeeker" },
  { text: "I hear singing from the walls. Beautiful and terrible.", author: "Lady_Moonfall" },
  { text: "Push the red book. Trust me.", author: "Wren" },
  { text: "The guardian's riddle: think flat, think paper.", author: "Anonymous" },
  { text: "I've been here three days. Or three centuries. Time is broken.", author: "Wanderer_42" },
  { text: "Don't look through the telescope at midnight.", author: "StarAnvil" },
  { text: "The merchant ghost gives fair prices. The skull gives fair warnings.", author: "Oakenshield" },
  { text: "To whoever finds this: I didn't make it out. The Scepter isn't worth it.", author: "Ser Aldous" },
  { text: "The stars below the glass floor are not stars. They are eyes.", author: "Hexbound" },
  { text: "If you free the thief, watch your pockets.", author: "Daggerfall" },
  { text: "The crown is the answer. The Scepter is the trap.", author: "Unknown" },
  { text: "I chose power. I regret it. Don't be me.", author: "Lord Vane" },
  { text: "Three shards make a key. River, rune, crypt.", author: "GhostPetal" },
];

// === GAME STATE ===

const defaultState = () => ({
  currentRoom: "moor_path",
  hp: 100,
  maxHp: 100,
  attack: 5,
  defense: 3,
  level: 1,
  xp: 0,
  xpToLevel: 50,
  gold: 0,
  inventory: [],
  equipped: { weapon: null, armor: null, offhand: null, light: null, amulet: null, ring: null },
  spells: [],
  visitedRooms: [],
  flags: {},
  questLog: [],
  completedQuests: [],
  kills: {},
  deaths: 0,
  roomsDiscovered: 0,
  itemsFound: 0,
  poisoned: false,
  poisonTurns: 0,
  tempAttackBonus: 0,
  tempAttackTurns: 0,
  inCombat: false,
  currentEnemy: null,
  commandHistory: [],
  historyIndex: -1,
  gameStarted: false,
  gameWon: false,
  ending: null,
  turnCount: 0,
  runeWallMessages: [],
});

let GS = defaultState();
let roomStates = {};

function initRoomStates() {
  roomStates = {};
  for (const [id, room] of Object.entries(ROOMS)) {
    roomStates[id] = {
      items: room.items ? [...room.items] : [],
      enemies: room.enemies ? [...room.enemies] : [],
      visited: false,
      searched: false,
      hiddenExitRevealed: room.hiddenExitRevealed || false,
    };
  }
}

// === UTILITY ===

function rng(min, max) { return Math.floor(Math.random() * (max - min + 1)) + min; }
function pick(arr) { return arr[Math.floor(Math.random() * arr.length)]; }
function capitalize(s) { return s.charAt(0).toUpperCase() + s.slice(1); }

// === UI RENDERING ===

const outputEl = () => document.getElementById('output');
const inputEl = () => document.getElementById('command-input');

function print(text, className) {
  const el = outputEl();
  const div = document.createElement('div');
  div.className = 'output-line' + (className ? ' ' + className : '');
  div.innerHTML = text;
  el.appendChild(div);
  el.scrollTop = el.scrollHeight;
}

function printLine() { print('<span class="separator">' + '─'.repeat(50) + '</span>'); }

function printRoom(roomId) {
  const room = ROOMS[roomId];
  const rs = roomStates[roomId];
  if (!room) return;

  printLine();
  print(room.name, 'room-name');
  print('<span class="text-dim">[' + room.region + ']</span>');
  print(room.desc, 'room-desc');

  if (!rs.visited && room.firstVisit) {
    print('');
    print(room.firstVisit, 'text-amber');
  }

  if (room.dark && !hasLight()) {
    print('');
    print('It is pitch dark. You can barely see your hand in front of your face. You need a light source.', 'text-red');
  }

  const items = rs.items.filter(id => ITEMS[id]);
  if (items.length > 0 && (!room.dark || hasLight())) {
    print('');
    print('You see: ' + items.map(id => '<span>' + ITEMS[id].name + '</span>').join(', '), 'room-items');
  }

  const enemies = rs.enemies.filter(id => ENEMIES[id]);
  if (enemies.length > 0 && (!room.dark || hasLight())) {
    print('');
    for (const eid of enemies) {
      print('! ' + ENEMIES[eid].name + ' — ' + ENEMIES[eid].desc, 'text-red');
    }
  }

  if (room.npcs && (!room.dark || hasLight())) {
    for (const nid of room.npcs) {
      const npc = NPCS[nid];
      if (npc && (!npc.quest || !npc.quest.completed || nid === 'talking_skull' || nid === 'merchant_ghost' || nid === 'mad_alchemist')) {
        print('');
        print(npc.name + ' is here.', 'room-npcs');
      }
    }
  }

  const exits = getExits(roomId);
  const exitNames = Object.keys(exits);
  if (exitNames.length > 0) {
    print('');
    print('Exits: ' + exitNames.map(e => '<span>' + e + '</span>').join(', '), 'room-exits');
  }

  rs.visited = true;
  if (!GS.visitedRooms.includes(roomId)) {
    GS.visitedRooms.push(roomId);
    GS.roomsDiscovered++;
  }

  document.title = 'The Hollowed Keep — ' + room.name;
  updatePanels();
}

function getExits(roomId) {
  const room = ROOMS[roomId];
  const rs = roomStates[roomId];
  const exits = { ...room.exits };
  if (room.hiddenExits && rs.hiddenExitRevealed) {
    Object.assign(exits, room.hiddenExits);
  }
  return exits;
}

function hasLight() {
  return GS.equipped.light !== null;
}

function hasItem(id) {
  return GS.inventory.includes(id);
}

function isEquipped(id) {
  return Object.values(GS.equipped).includes(id);
}

function getAttack() {
  let atk = GS.attack;
  if (GS.equipped.weapon && ITEMS[GS.equipped.weapon]) atk += ITEMS[GS.equipped.weapon].attack || 0;
  if (GS.equipped.ring && ITEMS[GS.equipped.ring]) atk += ITEMS[GS.equipped.ring].attack || 0;
  atk += GS.tempAttackBonus;
  return atk;
}

function getDefense() {
  let def = GS.defense;
  if (GS.equipped.armor && ITEMS[GS.equipped.armor]) def += ITEMS[GS.equipped.armor].defense || 0;
  if (GS.equipped.offhand && ITEMS[GS.equipped.offhand]) def += ITEMS[GS.equipped.offhand].defense || 0;
  if (GS.equipped.ring && ITEMS[GS.equipped.ring]) def += ITEMS[GS.equipped.ring].defense || 0;
  return def;
}

// === PANELS ===

function updatePanels() {
  updateStats();
  updateInventory();
  updateMap();
  updateQuests();
}

function updateStats() {
  const hpPct = Math.max(0, (GS.hp / GS.maxHp) * 100);
  const hpClass = hpPct <= 25 ? 'danger' : hpPct <= 50 ? 'warning' : '';
  const xpPct = GS.xpToLevel > 0 ? ((GS.xp / GS.xpToLevel) * 100) : 0;
  const el = document.getElementById('stats-content');
  el.innerHTML = `
    <div class="stat-line"><span class="stat-label">HP</span><span class="stat-value ${hpClass}">${GS.hp}/${GS.maxHp}</span></div>
    <div class="hp-bar"><div class="hp-bar-fill ${hpClass}" style="width:${hpPct}%"></div></div>
    <div class="stat-line"><span class="stat-label">Level</span><span class="stat-value">${GS.level}</span></div>
    <div class="xp-bar"><div class="xp-bar-fill" style="width:${xpPct}%"></div></div>
    <div class="stat-line"><span class="stat-label">ATK</span><span class="stat-value">${getAttack()}</span></div>
    <div class="stat-line"><span class="stat-label">DEF</span><span class="stat-value">${getDefense()}</span></div>
    <div class="stat-line"><span class="stat-label">Gold</span><span class="stat-value">${GS.gold}</span></div>
    <div class="stat-line"><span class="stat-label">Rooms</span><span class="stat-value">${GS.roomsDiscovered}/${Object.keys(ROOMS).length}</span></div>
    ${GS.poisoned ? '<div class="stat-line"><span class="stat-value danger">POISONED</span></div>' : ''}
    ${GS.tempAttackBonus > 0 ? '<div class="stat-line"><span class="stat-value warning">STR+' + GS.tempAttackBonus + ' (' + GS.tempAttackTurns + ')</span></div>' : ''}
  `;
}

function updateInventory() {
  const el = document.getElementById('inventory-content');
  if (GS.inventory.length === 0) {
    el.innerHTML = '<div class="text-dim">  (empty)</div>';
    return;
  }
  el.innerHTML = GS.inventory.map(id => {
    const item = ITEMS[id];
    if (!item) return '';
    const eq = isEquipped(id);
    return `<div class="inv-item${eq ? ' equipped' : ''}" title="${item.desc}">${item.name}</div>`;
  }).join('');
}

function updateMap() {
  const el = document.getElementById('map-content');
  const regionOrder = ["The Approach", "Courtyard", "Ground Floor", "Upper Floors", "The Dungeons", "The Deep"];
  const regions = {};
  for (const [id, room] of Object.entries(ROOMS)) {
    if (!GS.visitedRooms.includes(id)) continue;
    const r = room.region;
    if (!regions[r]) regions[r] = [];
    regions[r].push({ id, name: room.name, current: id === GS.currentRoom });
  }
  let mapText = '';
  for (const region of regionOrder) {
    if (!regions[region]) continue;
    mapText += `\n ${region}\n`;
    for (const room of regions[region]) {
      const marker = room.current ? ' >> ' : '    ';
      const cls = room.current ? 'map-current' : 'map-visited';
      mapText += `<span class="${cls}">${marker}${room.name}</span>\n`;
    }
  }
  el.innerHTML = mapText || '\n  (unexplored)';
}

function updateQuests() {
  const el = document.getElementById('quests-content');
  const active = GS.questLog.filter(q => !GS.completedQuests.includes(q));
  const completed = GS.completedQuests;
  if (active.length === 0 && completed.length === 0) {
    el.innerHTML = '<div class="text-dim">  (none)</div>';
    return;
  }
  let html = '';
  for (const qid of active) {
    const quest = findQuest(qid);
    if (quest) html += `<div class="quest-entry quest-active">${quest.name}</div>`;
  }
  for (const qid of completed) {
    const quest = findQuest(qid);
    if (quest) html += `<div class="quest-entry quest-completed">${quest.name}</div>`;
  }
  el.innerHTML = html;
}

function findQuest(qid) {
  for (const npc of Object.values(NPCS)) {
    if (npc.quest && npc.quest.id === qid) return npc.quest;
  }
  return null;
}

// === CHRONICLE SYSTEM ===

let chronicleTimer = null;
let chronicleEntries = [];

function initChronicle() {
  chronicleEntries = [];
  for (let i = 0; i < 6; i++) {
    addChronicleEntry();
  }
  renderChronicle();
  renderRuneWall();
  renderServer();
  chronicleTimer = setInterval(() => {
    addChronicleEntry();
    if (chronicleEntries.length > 10) chronicleEntries.shift();
    renderChronicle();
    renderServer();
  }, rng(15000, 45000));
}

function addChronicleEntry() {
  const name = pick(ADVENTURER_NAMES);
  const event = pick(CHRONICLE_EVENTS);
  const minutesAgo = rng(1, 120);
  const timeStr = minutesAgo < 2 ? 'just now' : minutesAgo < 60 ? minutesAgo + 'm ago' : Math.floor(minutesAgo / 60) + 'h ago';
  chronicleEntries.push({ name, ...event, time: timeStr });
}

function renderChronicle() {
  const el = document.getElementById('chronicle-content');
  el.innerHTML = chronicleEntries.slice().reverse().map(e => {
    const typeClass = e.type === 'death' ? 'chronicle-death' : e.type === 'discover' ? 'chronicle-discover' : '';
    return `<div class="chronicle-entry">
      <span class="chronicle-name">${e.name}</span>
      <span class="chronicle-action ${typeClass}"> ${e.action}</span>
      <span class="chronicle-time">${e.time}</span>
    </div>`;
  }).join('');
}

function renderRuneWall() {
  const el = document.getElementById('runewall-content');
  const allMessages = [...RUNE_WALL_MESSAGES];
  const saved = JSON.parse(localStorage.getItem('hollowkeep_runes') || '[]');
  for (const msg of saved) allMessages.push(msg);
  const shuffled = allMessages.sort(() => Math.random() - 0.5).slice(0, 8);
  el.innerHTML = shuffled.map(m =>
    `<div class="rune-entry">"${m.text}" <span class="rune-author">— ${m.author}</span></div>`
  ).join('');
}

function renderServer() {
  const el = document.getElementById('server-content');
  const uptime = 1247 + Math.floor((Date.now() % 86400000) / 3600000);
  const online = rng(3, 14);
  const deaths = rng(12, 47);
  el.innerHTML = `
    <div class="server-stat"><span>Uptime</span><span class="server-value">${uptime}d</span></div>
    <div class="server-stat"><span>Online</span><span class="server-value">${online}</span></div>
    <div class="server-stat"><span>Deaths today</span><span class="server-value">${deaths}</span></div>
    <div class="server-stat"><span>World resets</span><span class="server-value">0</span></div>
    <div class="server-stat"><span>Version</span><span class="server-value">2.17</span></div>
  `;
}

// === SAVE / LOAD ===

function saveGame() {
  const data = { gs: GS, rooms: roomStates, version: 2 };
  localStorage.setItem('hollowkeep_save', JSON.stringify(data));
  print('Game saved.', 'success-msg');
}

function loadGame() {
  const raw = localStorage.getItem('hollowkeep_save');
  if (!raw) { print('No saved game found.', 'error-msg'); return false; }
  try {
    const data = JSON.parse(raw);
    GS = { ...defaultState(), ...data.gs };
    roomStates = data.rooms;
    print('Game loaded.', 'success-msg');
    printRoom(GS.currentRoom);
    return true;
  } catch {
    print('Save data corrupted.', 'error-msg');
    return false;
  }
}

// === COMMAND PARSER ===

function parseCommand(raw) {
  const input = raw.trim().toLowerCase();
  if (!input) return;

  GS.turnCount++;
  GS.commandHistory.unshift(raw);
  if (GS.commandHistory.length > 50) GS.commandHistory.pop();
  GS.historyIndex = -1;

  print('');
  print('<span class="text-dim">&gt; ' + raw + '</span>');

  if (GS.inCombat) {
    handleCombatCommand(input);
    return;
  }

  if (GS.poisoned) {
    GS.poisonTurns--;
    GS.hp -= 3;
    print('The poison burns in your veins. (-3 HP)', 'text-red');
    if (GS.hp <= 0) { playerDeath('poison'); return; }
    if (GS.poisonTurns <= 0) { GS.poisoned = false; print('The poison fades from your system.', 'success-msg'); }
  }

  if (GS.tempAttackTurns > 0) {
    GS.tempAttackTurns--;
    if (GS.tempAttackTurns <= 0) {
      GS.tempAttackBonus = 0;
      print('The strength elixir wears off.', 'system-msg');
    }
  }

  const parts = input.split(/\s+/);
  const cmd = parts[0];
  const args = parts.slice(1).join(' ');

  const dirMap = { n: 'north', s: 'south', e: 'east', w: 'west', u: 'up', d: 'down',
    north: 'north', south: 'south', east: 'east', west: 'west', up: 'up', down: 'down' };

  if (dirMap[cmd]) { doMove(dirMap[cmd]); return; }

  switch (cmd) {
    case 'look': case 'l': doLook(args); break;
    case 'examine': case 'x': doExamine(args); break;
    case 'go': case 'move': case 'walk': doMove(dirMap[args] || args); break;
    case 'take': case 'get': case 'grab': case 'pick': doTake(args === 'up' ? parts.slice(2).join(' ') : args); break;
    case 'drop': doDrop(args); break;
    case 'use': doUse(args); break;
    case 'equip': case 'wear': case 'wield': doEquip(args); break;
    case 'unequip': case 'remove': doUnequip(args); break;
    case 'inventory': case 'i': case 'inv': doInventory(); break;
    case 'attack': case 'fight': case 'kill': case 'hit': doAttack(args); break;
    case 'talk': case 'speak': doTalk(args); break;
    case 'ask': doAsk(args); break;
    case 'answer': doAnswer(args); break;
    case 'search': case 'investigate': doSearch(); break;
    case 'open': case 'unlock': doOpen(args); break;
    case 'push': case 'pull': case 'press': doPush(args); break;
    case 'read': doRead(args); break;
    case 'combine': case 'craft': doCombine(args); break;
    case 'cast': doCast(args); break;
    case 'play': doPlay(args); break;
    case 'rest': case 'sleep': doRest(); break;
    case 'map': case 'm': doMap(); break;
    case 'stats': case 'status': case 'stat': doStats(); break;
    case 'quests': case 'journal': case 'quest': doQuests(); break;
    case 'save': saveGame(); break;
    case 'load': case 'restore': loadGame(); break;
    case 'help': case 'h': case '?': doHelp(); break;
    case 'lore': case 'history': doLore(); break;
    case 'carve': case 'write': doCarve(args); break;
    case 'xyzzy': print('A hollow voice says "Fool."', 'text-amber'); break;
    case 'plugh': print('Nothing happens. Were you expecting magic words to work? ...Wait.', 'text-dim'); break;
    case 'hint': case 'hints': doHint(); break;
    case 'flee': case 'run': doFlee(); break;
    case 'buy': case 'trade': case 'sell': doTrade(args); break;
    case 'brew': doBrew(); break;
    case 'give': doGive(args); break;
    case 'clear': case 'cls': outputEl().innerHTML = ''; printRoom(GS.currentRoom); break;
    case 'verbose': GS.flags.verbose = !GS.flags.verbose; print('Verbose mode ' + (GS.flags.verbose ? 'on' : 'off') + '.', 'system-msg'); break;
    default:
      print("I don't understand '" + cmd + "'. Type 'help' for commands.", 'error-msg');
  }

  updatePanels();
}

// === MOVEMENT ===

function doMove(dir) {
  if (!dir) { print('Go where? Specify a direction.', 'error-msg'); return; }
  const room = ROOMS[GS.currentRoom];
  const exits = getExits(GS.currentRoom);
  const target = exits[dir];

  if (!target) {
    print("You can't go " + dir + " from here.", 'error-msg');
    return;
  }

  const targetRoom = ROOMS[target];
  const targetState = roomStates[target];
  if (targetRoom && targetRoom.locked && targetState && !targetState.unlocked) {
    if (targetRoom.lockDir && targetRoom.lockDir !== dir) {
      // lock only applies in a specific direction
    } else {
      const keyName = targetRoom.lockKey;
      if (hasItem(keyName)) {
        print('You use the ' + ITEMS[keyName].name + ' to unlock the way.', 'success-msg');
        targetState.unlocked = true;
      } else if (hasItem('lockpicks') && !targetRoom.lockKey) {
        print('You pick the lock with practiced skill.', 'success-msg');
        targetState.unlocked = true;
      } else {
        print("The way is locked. You need the right key.", 'error-msg');
        return;
      }
    }
  }

  GS.currentRoom = target;
  printRoom(target);

  if (targetState && targetState.enemies.length > 0 && (!targetRoom.dark || hasLight())) {
    const enemyId = targetState.enemies[0];
    if (!GS.kills[target + '_' + enemyId]) {
      print('');
      print(ENEMIES[enemyId].name + ' blocks your path!', 'text-red');
    }
  }
}

// === LOOK & EXAMINE ===

function doLook(args) {
  if (!args) {
    printRoom(GS.currentRoom);
  } else {
    doExamine(args);
  }
}

function doExamine(args) {
  if (!args) { print('Examine what?', 'error-msg'); return; }

  const room = ROOMS[GS.currentRoom];
  const rs = roomStates[GS.currentRoom];

  const itemInRoom = rs.items.find(id => matchItem(id, args));
  if (itemInRoom && ITEMS[itemInRoom]) {
    print(ITEMS[itemInRoom].name + ': ' + ITEMS[itemInRoom].desc, 'text-white');
    return;
  }

  const itemInInv = GS.inventory.find(id => matchItem(id, args));
  if (itemInInv && ITEMS[itemInInv]) {
    print(ITEMS[itemInInv].name + ': ' + ITEMS[itemInInv].desc, 'text-white');
    return;
  }

  if (room.npcs) {
    const npcId = room.npcs.find(id => matchNpc(id, args));
    if (npcId && NPCS[npcId]) {
      print(NPCS[npcId].desc, 'text-white');
      return;
    }
  }

  if (rs.enemies.length > 0) {
    const eid = rs.enemies.find(id => matchEnemy(id, args));
    if (eid && ENEMIES[eid]) {
      print(ENEMIES[eid].desc, 'text-white');
      return;
    }
  }

  if (args.includes('well') && GS.currentRoom === 'main_courtyard') {
    print('A deep stone well, its interior swallowed by darkness. A bucket on a frayed rope hangs over the edge. You hear water far below. With proper rope, you might be able to descend.', 'text-white');
    return;
  }

  if (args.includes('mirror') && GS.currentRoom === 'lords_chamber') {
    print('The shattered mirror shows your face in a dozen fragments, each at a slightly different angle. In one shard, you see the room behind you—but the room in the reflection has someone standing in it. You spin around. Nothing.', 'text-white');
    return;
  }

  if (args.includes('telescope') && GS.currentRoom === 'observatory') {
    print('You peer through the telescope. The lens shows a patch of sky between the stars—and in that void, shapes move. Vast, slow shapes that suggest intelligence and scale beyond comprehension. You pull away, trembling.', 'text-white');
    return;
  }

  if (args.includes('painting') && GS.currentRoom === 'gallery') {
    print('The covered painting at the end of the gallery. Its surface seems to shift beneath the cloth. You\'re not sure you want to look again.', 'text-white');
    return;
  }

  if (args.includes('throne') && GS.currentRoom === 'throne_of_shadows') {
    print('The throne is carved from solidified shadow—a paradox made material. Its surface absorbs all light. Sitting in it would mean touching something that exists in another reality entirely. The Scepter of Aethon rests upon its arm.', 'text-white');
    return;
  }

  if (args.includes('fountain') && GS.currentRoom === 'main_courtyard') {
    print('The fountain is dry, its basin cracked. The central figure was once a person—now eroded to abstraction. One arm reaches skyward, the other clutches something to its chest. Water stains suggest it once ran with something other than water—the residue is a dark, iridescent red.', 'text-white');
    return;
  }

  print("You don't see anything special about that.", 'text-dim');
}

function matchItem(id, query) {
  const item = ITEMS[id];
  if (!item) return false;
  const q = query.toLowerCase();
  return id.toLowerCase().includes(q) || item.name.toLowerCase().includes(q);
}

function matchNpc(id, query) {
  const npc = NPCS[id];
  if (!npc) return false;
  const q = query.toLowerCase();
  return id.toLowerCase().replace(/_/g, ' ').includes(q) || npc.name.toLowerCase().includes(q);
}

function matchEnemy(id, query) {
  const enemy = ENEMIES[id];
  if (!enemy) return false;
  const q = query.toLowerCase();
  return id.toLowerCase().replace(/_/g, ' ').includes(q) || enemy.name.toLowerCase().includes(q);
}

// === ITEMS ===

function doTake(args) {
  if (!args) { print('Take what?', 'error-msg'); return; }
  const rs = roomStates[GS.currentRoom];
  if (args === 'all') {
    const toTake = [...rs.items];
    if (toTake.length === 0) { print('Nothing to take here.', 'text-dim'); return; }
    for (const id of toTake) {
      rs.items = rs.items.filter(i => i !== id);
      GS.inventory.push(id);
      GS.itemsFound++;
      print('Taken: ' + ITEMS[id].name, 'success-msg');
    }
    return;
  }
  const idx = rs.items.findIndex(id => matchItem(id, args));
  if (idx === -1) { print("You don't see that here.", 'error-msg'); return; }
  const id = rs.items[idx];

  if (GS.currentRoom === 'armory' && id === 'chain_mail' && rs.enemies.includes('animated_armor') && !GS.kills['armory_animated_armor']) {
    print('As you reach for the chain mail, the suit of armor lurches to life!', 'text-red');
    startCombat('animated_armor');
    return;
  }

  rs.items.splice(idx, 1);
  GS.inventory.push(id);
  GS.itemsFound++;
  print('Taken: ' + ITEMS[id].name, 'success-msg');

  if (id === 'ancient_tome' && !GS.spells.includes('sunder')) {
    print('You leaf through the tome. A chapter on the "Word of Sundering" catches your eye—a word of power that disrupts shadow constructs. You commit it to memory.', 'text-amber');
    GS.spells.push('sunder');
  }
}

function doDrop(args) {
  if (!args) { print('Drop what?', 'error-msg'); return; }
  const idx = GS.inventory.findIndex(id => matchItem(id, args));
  if (idx === -1) { print("You don't have that.", 'error-msg'); return; }
  const id = GS.inventory[idx];
  for (const slot of Object.keys(GS.equipped)) {
    if (GS.equipped[slot] === id) GS.equipped[slot] = null;
  }
  GS.inventory.splice(idx, 1);
  roomStates[GS.currentRoom].items.push(id);
  print('Dropped: ' + ITEMS[id].name, 'text-dim');
}

function doInventory() {
  if (GS.inventory.length === 0) {
    print('You are carrying nothing.', 'text-dim');
    return;
  }
  print('You are carrying:', 'text-amber');
  for (const id of GS.inventory) {
    const item = ITEMS[id];
    const eq = isEquipped(id) ? ' [equipped]' : '';
    print('  ' + item.name + eq, eq ? 'text-amber' : 'text-green');
  }
  print('Gold: ' + GS.gold, 'text-amber');
}

function doEquip(args) {
  if (!args) { print('Equip what?', 'error-msg'); return; }
  const idx = GS.inventory.findIndex(id => matchItem(id, args));
  if (idx === -1) { print("You don't have that.", 'error-msg'); return; }
  const id = GS.inventory[idx];
  const item = ITEMS[id];
  if (!item.equippable) { print("You can't equip that.", 'error-msg'); return; }
  if (GS.equipped[item.slot] === id) { print("Already equipped.", 'text-dim'); return; }
  if (GS.equipped[item.slot]) {
    print('You unequip ' + ITEMS[GS.equipped[item.slot]].name + '.', 'text-dim');
  }
  GS.equipped[item.slot] = id;
  print('Equipped: ' + item.name, 'success-msg');
}

function doUnequip(args) {
  if (!args) { print('Unequip what?', 'error-msg'); return; }
  for (const [slot, id] of Object.entries(GS.equipped)) {
    if (id && matchItem(id, args)) {
      GS.equipped[slot] = null;
      print('Unequipped: ' + ITEMS[id].name, 'text-dim');
      return;
    }
  }
  print("You don't have that equipped.", 'error-msg');
}

function doUse(args) {
  if (!args) { print('Use what?', 'error-msg'); return; }
  const idx = GS.inventory.findIndex(id => matchItem(id, args));
  if (idx === -1) { print("You don't have that.", 'error-msg'); return; }
  const id = GS.inventory[idx];
  const item = ITEMS[id];

  if (item.type === 'consumable') {
    if (item.healing) {
      GS.hp = Math.min(GS.maxHp, GS.hp + item.healing);
      print('You consume the ' + item.name + '. (+' + item.healing + ' HP)', 'combat-heal');
      GS.inventory.splice(idx, 1);
    } else if (item.curesPoison) {
      GS.poisoned = false;
      GS.poisonTurns = 0;
      print('You drink the antidote. The poison is purged from your body.', 'combat-heal');
      GS.inventory.splice(idx, 1);
    } else if (item.tempAttack) {
      GS.tempAttackBonus = item.tempAttack;
      GS.tempAttackTurns = item.duration || 3;
      print('You drink the ' + item.name + '. Power surges through your muscles! (+' + item.tempAttack + ' ATK for ' + GS.tempAttackTurns + ' turns)', 'text-amber');
      GS.inventory.splice(idx, 1);
    } else if (item.undeadOnly) {
      print("The holy water burns your hands slightly. Better used on something unholy.", 'text-dim');
    }
    return;
  }

  if (id === 'rope' && GS.currentRoom === 'main_courtyard') {
    print('You tie the rope to the well\'s crossbar and lower yourself down into the darkness...', 'text-amber');
    if (!ROOMS.underground_river.exits.up_well) {
      ROOMS.underground_river.exits.up_well = 'main_courtyard';
      ROOMS.main_courtyard.exits.down = 'underground_river';
    }
    GS.currentRoom = 'underground_river';
    printRoom('underground_river');
    return;
  }

  if (id === 'bone_flute') {
    print('You raise the bone flute to your lips and play. A haunting melody fills the air, resonating in your bones. Restless spirits calm. The shadows themselves seem to still.', 'text-cyan');
    if (GS.currentRoom === 'catacombs' && roomStates.catacombs.enemies.includes('wraith') && !GS.kills['catacombs_wraith']) {
      print('The Wraith pauses, its form flickering. For a moment, you see the chaplain it once was—eyes full of sorrow. Then it dissipates, not destroyed but... released.', 'text-amber');
      GS.kills['catacombs_wraith'] = true;
      roomStates.catacombs.enemies = [];
      GS.xp += 40;
      print('(+40 XP)', 'text-cyan');
      checkLevelUp();
    }
    return;
  }

  if (id === 'silver_mirror') {
    print('You hold up the mirror. Your reflection stares back—but a moment behind, always reacting to what you just did. In the mirror, you can see things that aren\'t visible directly: hidden writing on walls, invisible presences, the true nature of illusions.', 'text-cyan');
    if (GS.currentRoom === 'shadow_halls') {
      print('The mirror reveals the correct path through the shifting corridors! The geometry that confounds the eye becomes clear in the reflection.', 'text-amber');
    }
    return;
  }

  if (id === 'map_fragment') {
    print('The map shows the Keep\'s layout. A passage behind the reading nook bookshelf is marked, activated by a red-bound book. The lower levels are partially mapped, with warnings scrawled at every junction.', 'text-white');
    return;
  }

  if (item.equippable) {
    doEquip(args);
    return;
  }

  print("You can't figure out how to use that here.", 'text-dim');
}

// === COMBAT ===

function doAttack(args) {
  const rs = roomStates[GS.currentRoom];
  if (rs.enemies.length === 0) {
    print("There's nothing to attack here.", 'error-msg');
    return;
  }
  const room = ROOMS[GS.currentRoom];
  if (room.dark && !hasLight()) {
    print("You can't fight what you can't see!", 'error-msg');
    return;
  }
  const enemyId = args ? rs.enemies.find(id => matchEnemy(id, args)) : rs.enemies[0];
  if (!enemyId) { print("You don't see that enemy.", 'error-msg'); return; }
  if (GS.kills[GS.currentRoom + '_' + enemyId]) { print("It's already defeated.", 'text-dim'); return; }
  startCombat(enemyId);
}

function startCombat(enemyId) {
  const template = ENEMIES[enemyId];
  GS.inCombat = true;
  GS.currentEnemy = { ...template, id: enemyId, hp: template.hp };
  printLine();
  print('COMBAT: ' + template.name, 'text-red text-bold');
  print(template.desc, 'text-white');
  print('HP: ' + template.hp + '/' + template.maxHp + ' | ATK: ' + template.attack + ' | DEF: ' + template.defense, 'combat-info');
  print('');
  print("Commands: attack, use [item], cast [spell], flee", 'text-dim');
  printLine();
}

function handleCombatCommand(input) {
  const parts = input.split(/\s+/);
  const cmd = parts[0];
  const args = parts.slice(1).join(' ');
  const enemy = GS.currentEnemy;

  if (cmd === 'attack' || cmd === 'hit' || cmd === 'fight' || cmd === 'a') {
    let playerAtk = getAttack();
    let bonusDmg = 0;

    if (enemy.undead && GS.equipped.weapon) {
      const wpn = ITEMS[GS.equipped.weapon];
      if (wpn && wpn.undeadBonus) bonusDmg += wpn.undeadBonus;
    }

    if (enemy.physicalResist && !(GS.equipped.weapon && ITEMS[GS.equipped.weapon] && ITEMS[GS.equipped.weapon].undeadBonus)) {
      playerAtk = Math.floor(playerAtk / 3);
      print('Your weapon passes through the creature with little effect! You need silver!', 'text-amber');
    }

    if (enemy.shadowBeing && !hasItem('amulet_of_warding') && !isEquipped('amulet_of_warding')) {
      print('Shadow energy saps your strength! You need protection!', 'text-amber');
      playerAtk = Math.floor(playerAtk / 2);
    }

    const dmg = Math.max(1, playerAtk + bonusDmg - enemy.defense + rng(-2, 2));
    enemy.hp -= dmg;
    print('You strike the ' + enemy.name + ' for ' + dmg + ' damage!', 'combat-hit');

    if (enemy.hp <= 0) {
      endCombat(true);
      return;
    }

    if (enemy.regenerates && enemy.shadowBeing && !isEquipped('amulet_of_warding')) {
      const regen = 8;
      enemy.hp = Math.min(enemy.maxHp, enemy.hp + regen);
      print('The ' + enemy.name + ' regenerates ' + regen + ' HP from the surrounding darkness!', 'text-amber');
    }

    print(enemy.name + ' HP: ' + enemy.hp + '/' + enemy.maxHp, 'combat-info');
    enemyTurn();

  } else if (cmd === 'use') {
    const itemIdx = GS.inventory.findIndex(id => matchItem(id, args));
    if (itemIdx === -1) { print("You don't have that.", 'error-msg'); return; }
    const itemId = GS.inventory[itemIdx];
    const item = ITEMS[itemId];

    if (itemId === 'holy_water' && enemy.undead) {
      GS.inventory.splice(itemIdx, 1);
      const dmg = item.damage || 30;
      enemy.hp -= dmg;
      print('You hurl the holy water! It burns the ' + enemy.name + ' for ' + dmg + ' damage!', 'combat-hit');
      if (enemy.hp <= 0) { endCombat(true); return; }
      print(enemy.name + ' HP: ' + enemy.hp + '/' + enemy.maxHp, 'combat-info');
    } else if (item.healing) {
      GS.inventory.splice(itemIdx, 1);
      GS.hp = Math.min(GS.maxHp, GS.hp + item.healing);
      print('You consume the ' + item.name + '. (+' + item.healing + ' HP)', 'combat-heal');
    } else if (item.tempAttack) {
      GS.inventory.splice(itemIdx, 1);
      GS.tempAttackBonus = item.tempAttack;
      GS.tempAttackTurns = item.duration || 3;
      print('You drink the ' + item.name + '! (+' + item.tempAttack + ' ATK)', 'text-amber');
    } else {
      print("You can't use that effectively in combat.", 'error-msg');
      return;
    }
    enemyTurn();

  } else if (cmd === 'cast') {
    if (!GS.spells.includes(args || 'sunder')) {
      print("You don't know that spell.", 'error-msg');
      return;
    }
    if ((args || 'sunder') === 'sunder') {
      if (enemy.shadowBeing || enemy.undead) {
        const dmg = 25 + rng(0, 10);
        enemy.hp -= dmg;
        print('You speak the Word of Sundering! Reality ripples and the ' + enemy.name + '\'s form tears apart! (' + dmg + ' damage)', 'text-cyan');
        if (enemy.hp <= 0) { endCombat(true); return; }
        print(enemy.name + ' HP: ' + enemy.hp + '/' + enemy.maxHp, 'combat-info');
      } else {
        print('The Word of Sundering washes over the ' + enemy.name + ' with no effect. It only works on shadow and undead.', 'text-dim');
      }
      enemyTurn();
    }

  } else if (cmd === 'flee' || cmd === 'run') {
    doFlee();

  } else if (cmd === 'look' || cmd === 'l') {
    print(enemy.name + ' — HP: ' + enemy.hp + '/' + enemy.maxHp, 'combat-info');
    print('Your HP: ' + GS.hp + '/' + GS.maxHp, 'combat-info');

  } else {
    print("In combat: attack, use [item], cast [spell], flee, look", 'text-dim');
  }

  updatePanels();
}

function enemyTurn() {
  const enemy = GS.currentEnemy;
  const enemyDmg = Math.max(1, enemy.attack - getDefense() + rng(-2, 2));
  GS.hp -= enemyDmg;
  print(enemy.attackMsg + ' (' + enemyDmg + ' damage)', 'combat-hit');

  if (enemy.poisonous && !GS.poisoned && rng(1, 3) === 1) {
    GS.poisoned = true;
    GS.poisonTurns = 5;
    print('You have been poisoned!', 'text-red');
  }

  if (GS.hp <= 0) {
    playerDeath(enemy.name);
  }
}

function endCombat(victory) {
  const enemy = GS.currentEnemy;
  if (victory) {
    printLine();
    print(enemy.defeatMsg, 'success-msg');
    print('+' + enemy.xp + ' XP', 'text-cyan');
    GS.xp += enemy.xp;
    if (enemy.gold > 0) {
      GS.gold += enemy.gold;
      print('+' + enemy.gold + ' gold', 'text-amber');
    }
    if (enemy.loot) {
      GS.inventory.push(enemy.loot);
      GS.itemsFound++;
      print('Obtained: ' + ITEMS[enemy.loot].name, 'text-amber');
    }
    GS.kills[GS.currentRoom + '_' + enemy.id] = true;
    roomStates[GS.currentRoom].enemies = roomStates[GS.currentRoom].enemies.filter(e => e !== enemy.id);
    if (!GS.kills[enemy.id]) GS.kills[enemy.id] = 0;
    GS.kills[enemy.id]++;
    printLine();
    checkLevelUp();

    if (enemy.boss && enemy.id === 'shadow_lord') {
      handleShadowLordDefeat();
    }
  }
  GS.inCombat = false;
  GS.currentEnemy = null;
}

function doFlee() {
  if (!GS.inCombat) { print("You're not in combat.", 'text-dim'); return; }
  if (GS.currentEnemy && GS.currentEnemy.boss) {
    print("You cannot flee from this battle!", 'error-msg');
    enemyTurn();
    return;
  }
  if (rng(1, 3) <= 2) {
    print('You manage to disengage and retreat!', 'text-amber');
    GS.inCombat = false;
    const enemy = GS.currentEnemy;
    if (enemy) {
      const template = ENEMIES[enemy.id];
      if (template) roomStates[GS.currentRoom].enemies = [enemy.id];
    }
    GS.currentEnemy = null;
    const exits = getExits(GS.currentRoom);
    const dirs = Object.keys(exits);
    if (dirs.length > 0) {
      const dir = dirs[0];
      GS.currentRoom = exits[dir];
      printRoom(GS.currentRoom);
    }
  } else {
    print('You fail to escape!', 'error-msg');
    enemyTurn();
  }
  updatePanels();
}

function playerDeath(cause) {
  GS.inCombat = false;
  GS.currentEnemy = null;
  GS.deaths++;
  printLine();
  print('', '');
  print('  Y O U   H A V E   D I E D', 'combat-death');
  print('', '');
  if (cause === 'poison') {
    print('  The poison claimed you at last.', 'text-red');
  } else {
    print('  Slain by: ' + cause, 'text-red');
  }
  print('  Deaths: ' + GS.deaths + ' | Rooms: ' + GS.roomsDiscovered + ' | Turns: ' + GS.turnCount, 'text-dim');
  print('', '');
  print('  The Keep endures. You do not.', 'text-dim');
  print('  But the moor path remembers your footsteps...', 'text-dim');
  print('', '');
  printLine();
  print("Type 'load' to restore a save, or 'restart' to begin anew.", 'text-amber');

  GS.hp = GS.maxHp;
  GS.poisoned = false;
  GS.poisonTurns = 0;
  GS.currentRoom = 'moor_path';
  GS.tempAttackBonus = 0;
  GS.tempAttackTurns = 0;
}

function checkLevelUp() {
  while (GS.xp >= GS.xpToLevel) {
    GS.xp -= GS.xpToLevel;
    GS.level++;
    GS.maxHp += 15;
    GS.hp = GS.maxHp;
    GS.attack += 1;
    GS.defense += 1;
    GS.xpToLevel = Math.floor(GS.xpToLevel * 1.5);
    print('LEVEL UP! You are now level ' + GS.level + '!', 'text-bright');
    print('  HP: ' + GS.maxHp + ' | ATK: ' + GS.attack + ' | DEF: ' + GS.defense, 'text-cyan');
  }
}

// === NPC INTERACTION ===

function doTalk(args) {
  const room = ROOMS[GS.currentRoom];
  if (!room.npcs || room.npcs.length === 0) {
    print("There's nobody to talk to here.", 'error-msg');
    return;
  }
  const npcId = args ? room.npcs.find(id => matchNpc(id, args)) : room.npcs[0];
  if (!npcId || !NPCS[npcId]) {
    print("You don't see that person.", 'error-msg');
    return;
  }
  const npc = NPCS[npcId];
  print('<span class="npc-name">' + npc.name + '</span>', '');
  print(npc.greeting, 'npc-speech');
  if (npc.topics) {
    print('');
    print('Topics: ' + Object.keys(npc.topics).join(', '), 'text-dim');
    print("(Type 'ask [topic]' to inquire)", 'text-dim');
  }

  if (npc.quest && !npc.quest.active && !npc.quest.completed && !GS.questLog.includes(npc.quest.id)) {
    GS.questLog.push(npc.quest.id);
    npc.quest.active = true;
    print('');
    print('New quest: ' + npc.quest.name, 'text-amber');
  }
}

function doAsk(args) {
  const room = ROOMS[GS.currentRoom];
  if (!room.npcs || room.npcs.length === 0) {
    print("There's nobody to ask.", 'error-msg');
    return;
  }

  const parts = args.split(/\s+about\s+/i);
  let npcQuery, topic;
  if (parts.length > 1) {
    npcQuery = parts[0];
    topic = parts[1];
  } else {
    topic = args;
    npcQuery = null;
  }

  const npcId = npcQuery ? room.npcs.find(id => matchNpc(id, npcQuery)) : room.npcs[0];
  if (!npcId || !NPCS[npcId]) {
    print("You don't see that person.", 'error-msg');
    return;
  }
  const npc = NPCS[npcId];

  if (npc.topics && npc.topics[topic]) {
    print('<span class="npc-name">' + npc.name + '</span>:', '');
    print(npc.topics[topic], 'npc-speech');
  } else {
    print(npc.name + " doesn't have anything to say about that.", 'text-dim');
    if (npc.topics) {
      print('Try asking about: ' + Object.keys(npc.topics).join(', '), 'text-dim');
    }
  }
}

function doAnswer(args) {
  const room = ROOMS[GS.currentRoom];
  if (!room.npcs) { print("Nobody is listening.", 'error-msg'); return; }

  if (room.npcs.includes('spectral_guardian')) {
    const guardian = NPCS.spectral_guardian;
    if (guardian.riddleSolved) {
      print("The guardian nods. 'You have already answered correctly.'", 'npc-speech');
      return;
    }
    if (args.toLowerCase().includes(guardian.riddleAnswer)) {
      guardian.riddleSolved = true;
      print("The guardian's stern expression softens. 'Correct. The simplest answers are often the truest.' The silver dagger materializes in your hands, cold and thrumming with power.", 'npc-speech');
      GS.inventory.push(guardian.riddleReward);
      GS.itemsFound++;
      print('Obtained: ' + ITEMS[guardian.riddleReward].name, 'text-amber');
      GS.flags.riddleSolved = true;
    } else {
      print("The guardian shakes its head. 'Incorrect. Think carefully. I have cities, but no houses. Mountains, but no trees...'", 'npc-speech');
    }
    return;
  }

  print("Nobody is waiting for an answer.", 'error-msg');
}

function doGive(args) {
  const room = ROOMS[GS.currentRoom];
  if (!room.npcs || room.npcs.length === 0) {
    print("There's nobody to give things to.", 'error-msg');
    return;
  }

  for (const npcId of room.npcs) {
    const npc = NPCS[npcId];
    if (!npc || !npc.quest || npc.quest.completed) continue;

    const req = npc.quest.requires;
    if (Array.isArray(req)) {
      if (req.every(id => hasItem(id))) {
        for (const id of req) {
          GS.inventory = GS.inventory.filter(i => i !== id);
        }
        npc.quest.completed = true;
        GS.completedQuests.push(npc.quest.id);
        print(npc.quest.onComplete, 'npc-speech');
        if (npc.quest.reward) {
          for (const r of npc.quest.reward) { GS.inventory.push(r); GS.itemsFound++; }
        }
        if (npc.quest.rewardText) print(npc.quest.rewardText, 'text-amber');
        if (npc.quest.statBonus) {
          if (npc.quest.statBonus.attack) GS.attack += npc.quest.statBonus.attack;
          if (npc.quest.statBonus.defense) GS.defense += npc.quest.statBonus.defense;
        }
        if (npc.quest.teachesSpell && !GS.spells.includes(npc.quest.teachesSpell)) {
          GS.spells.push(npc.quest.teachesSpell);
          print('Learned spell: ' + npc.quest.teachesSpell, 'text-cyan');
        }
        if (npc.quest.revealsHidden) {
          roomStates[npc.quest.revealsHidden].hiddenExitRevealed = true;
          print('Secret passage revealed in the ' + ROOMS[npc.quest.revealsHidden].name + '!', 'text-amber');
        }
        return;
      }
    } else if (typeof req === 'string') {
      if (hasItem(req)) {
        GS.inventory = GS.inventory.filter(i => i !== req);
        npc.quest.completed = true;
        GS.completedQuests.push(npc.quest.id);
        print(npc.quest.onComplete, 'npc-speech');
        if (npc.quest.reward) {
          for (const r of npc.quest.reward) { GS.inventory.push(r); GS.itemsFound++; }
        }
        if (npc.quest.rewardText) print(npc.quest.rewardText, 'text-amber');
        if (npc.quest.statBonus) {
          if (npc.quest.statBonus.attack) GS.attack += npc.quest.statBonus.attack;
          if (npc.quest.statBonus.defense) GS.defense += npc.quest.statBonus.defense;
        }
        if (npc.quest.revealsHidden) {
          roomStates[npc.quest.revealsHidden].hiddenExitRevealed = true;
          print('Secret passage revealed in the ' + ROOMS[npc.quest.revealsHidden].name + '!', 'text-amber');
        }
        return;
      }
    }
  }

  print("They don't seem interested in what you're offering.", 'text-dim');
}

// === SEARCH, PUSH, READ ===

function doSearch() {
  const room = ROOMS[GS.currentRoom];
  const rs = roomStates[GS.currentRoom];

  if (room.dark && !hasLight()) {
    print("You grope in the darkness but find nothing. You need light to search.", 'error-msg');
    return;
  }

  if (rs.searched) {
    print("You've already thoroughly searched this area.", 'text-dim');
    return;
  }

  rs.searched = true;
  if (room.search) {
    print(room.search, 'text-white');
    if (room.searchItems) {
      for (const id of room.searchItems) {
        if (ITEMS[id]) {
          rs.items.push(id);
          print('Found: ' + ITEMS[id].name, 'text-amber');
        }
      }
    }
  } else {
    print("You search the area thoroughly but find nothing of note.", 'text-dim');
  }
}

function doPush(args) {
  if (!args) { print('Push what?', 'error-msg'); return; }

  if (GS.currentRoom === 'reading_nook' && (args.includes('red') || args.includes('book') || args.includes('binding') || args.includes('crimson'))) {
    const rs = roomStates.reading_nook;
    if (rs.hiddenExitRevealed) {
      print("The bookshelf is already open.", 'text-dim');
      return;
    }
    rs.hiddenExitRevealed = true;
    print('You push the crimson binding. Something clicks deep within the wall. The entire bookshelf swings inward with a groan of ancient hinges, revealing a dark passage beyond.', 'text-amber');
    print('A rush of cold, dusty air escapes the opening. The passage leads east into darkness.', 'text-white');
    GS.flags.hiddenPassageFound = true;
    return;
  }

  print("Nothing happens when you push that.", 'text-dim');
}

function doRead(args) {
  if (!args) { print('Read what?', 'error-msg'); return; }
  const idx = GS.inventory.findIndex(id => matchItem(id, args));
  if (idx !== -1) {
    const item = ITEMS[GS.inventory[idx]];
    print(item.desc, 'text-white');
    return;
  }
  print("You don't have anything like that to read.", 'error-msg');
}

// === CRAFTING ===

function doCombine(args) {
  if (hasItem('crystal_shard_1') && hasItem('crystal_shard_2') && hasItem('crystal_shard_3') &&
      (args.includes('shard') || args.includes('crystal'))) {
    GS.inventory = GS.inventory.filter(i => !i.startsWith('crystal_shard'));
    GS.inventory.push('crystal_key');
    GS.itemsFound++;
    print('The three crystal shards drift together, drawn by invisible forces. They fuse in a flash of light, forming a key that exists in multiple states simultaneously—solid and liquid, dark and light, here and elsewhere.', 'text-cyan');
    print('Obtained: Crystal Key', 'text-amber');
    return;
  }

  if (hasItem('rope') && hasItem('iron_hook') && (args.includes('rope') || args.includes('hook') || args.includes('grappling'))) {
    GS.inventory = GS.inventory.filter(i => i !== 'rope' && i !== 'iron_hook');
    GS.inventory.push('grappling_hook');
    GS.itemsFound++;
    print('You lash the iron hook to the rope, creating a serviceable grappling hook.', 'success-msg');
    print('Obtained: Grappling Hook', 'text-amber');
    return;
  }

  print("You can't combine those things.", 'text-dim');
}

// === SPELLS ===

function doCast(args) {
  if (!args) { print('Cast what? Known spells: ' + (GS.spells.length > 0 ? GS.spells.join(', ') : 'none'), 'error-msg'); return; }
  if (!GS.spells.includes(args)) {
    print("You don't know that spell.", 'error-msg');
    return;
  }
  if (args === 'sunder') {
    if (GS.inCombat) return;
    print('You speak the Word of Sundering. A ripple of force expands outward, disrupting shadow constructs.', 'text-cyan');
    const rs = roomStates[GS.currentRoom];
    if (rs.enemies.length > 0) {
      const enemy = ENEMIES[rs.enemies[0]];
      if (enemy && (enemy.shadowBeing || enemy.undead)) {
        print('The ' + enemy.name + ' shudders as the word tears at its essence!', 'text-amber');
        startCombat(rs.enemies[0]);
        GS.currentEnemy.hp -= 25;
        print('The Word of Sundering dealt 25 damage!', 'combat-hit');
        if (GS.currentEnemy.hp <= 0) { endCombat(true); }
      }
    }
  }
}

// === PLAY ===

function doPlay(args) {
  if (hasItem('bone_flute') && (args.includes('flute') || !args)) {
    doUse('bone flute');
  } else {
    print("Play what?", 'error-msg');
  }
}

// === MISC COMMANDS ===

function doRest() {
  const room = ROOMS[GS.currentRoom];
  const rs = roomStates[GS.currentRoom];
  if (rs.enemies.length > 0 && !GS.kills[GS.currentRoom + '_' + rs.enemies[0]]) {
    print("You can't rest with enemies nearby!", 'error-msg');
    return;
  }
  if (GS.hp >= GS.maxHp) {
    print("You're already at full health.", 'text-dim');
    return;
  }
  const heal = rng(10, 20);
  GS.hp = Math.min(GS.maxHp, GS.hp + heal);
  print('You rest for a while, tending your wounds. (+' + heal + ' HP)', 'combat-heal');
}

function doMap() {
  print('=== EXPLORED REGIONS ===', 'text-amber');
  const regionOrder = ["The Approach", "Courtyard", "Ground Floor", "Upper Floors", "The Dungeons", "The Deep"];
  for (const region of regionOrder) {
    const rooms = Object.entries(ROOMS).filter(([id, r]) => r.region === region && GS.visitedRooms.includes(id));
    if (rooms.length === 0) continue;
    print('');
    print('  ' + region, 'text-amber');
    for (const [id, room] of rooms) {
      const marker = id === GS.currentRoom ? ' >> ' : '    ';
      const exits = Object.entries(getExits(id)).map(([dir, target]) => {
        const tRoom = ROOMS[target];
        const visited = GS.visitedRooms.includes(target);
        return dir + ':' + (visited ? tRoom.name : '???');
      }).join(', ');
      const style = id === GS.currentRoom ? 'text-amber' : 'text-green';
      print(marker + room.name, style);
      print('        [' + exits + ']', 'text-dim');
    }
  }
}

function doStats() {
  print('=== CHARACTER STATS ===', 'text-amber');
  print('  Level: ' + GS.level + ' (' + GS.xp + '/' + GS.xpToLevel + ' XP)', 'text-green');
  print('  HP: ' + GS.hp + '/' + GS.maxHp, 'text-green');
  print('  Attack: ' + getAttack() + ' (base: ' + GS.attack + ')', 'text-green');
  print('  Defense: ' + getDefense() + ' (base: ' + GS.defense + ')', 'text-green');
  print('  Gold: ' + GS.gold, 'text-green');
  print('  Rooms discovered: ' + GS.roomsDiscovered + '/' + Object.keys(ROOMS).length, 'text-green');
  print('  Items found: ' + GS.itemsFound, 'text-green');
  print('  Deaths: ' + GS.deaths, GS.deaths > 0 ? 'text-red' : 'text-green');
  print('  Turns: ' + GS.turnCount, 'text-green');
  if (GS.spells.length > 0) print('  Spells: ' + GS.spells.join(', '), 'text-cyan');
  print('');
  print('  Equipped:', 'text-amber');
  for (const [slot, id] of Object.entries(GS.equipped)) {
    if (id) print('    ' + capitalize(slot) + ': ' + ITEMS[id].name, 'text-green');
  }
}

function doQuests() {
  const active = GS.questLog.filter(q => !GS.completedQuests.includes(q));
  const completed = GS.completedQuests;
  if (active.length === 0 && completed.length === 0) {
    print('No quests yet. Talk to the inhabitants of the Keep.', 'text-dim');
    return;
  }
  if (active.length > 0) {
    print('=== ACTIVE QUESTS ===', 'text-amber');
    for (const qid of active) {
      const quest = findQuest(qid);
      if (quest) print('  > ' + quest.name, 'text-green');
    }
  }
  if (completed.length > 0) {
    print('=== COMPLETED ===', 'text-dim');
    for (const qid of completed) {
      const quest = findQuest(qid);
      if (quest) print('  x ' + quest.name, 'text-dim');
    }
  }
}

function doLore() {
  print('=== THE HOLLOWED KEEP ===', 'text-amber');
  print('', '');
  print('The Hollowed Keep appeared on the moors of Ashenvale one moonless', 'text-white');
  print('night in 993 A.D. None knew its origin. The local folk whispered of', 'text-white');
  print('Lord Aldric Vane—a nobleman who sought power beyond mortal reach—and', 'text-white');
  print('the Scepter of Aethon, a relic said to command shadow and flame.', 'text-white');
  print('', '');
  print('The Vane dynasty ruled from the Keep for generations, each lord', 'text-white');
  print('wielding the Scepter, each consumed by its power. The last—Lord', 'text-white');
  print('Malachar Vane—opened the way fully, becoming the Shadow Lord, a', 'text-white');
  print('being of pure darkness bound to the throne for eternity.', 'text-white');
  print('', '');
  print('Many adventurers have entered the Keep seeking the Scepter.', 'text-white');
  print('Few have returned. The Keep endures.', 'text-white');
  print('', '');
  print('Type "help" for a list of commands.', 'text-dim');
}

function doHint() {
  const hints = [];
  if (!GS.visitedRooms.includes('gatehouse')) hints.push('Head north to enter the Keep. The gatehouse may hold supplies.');
  else if (GS.inventory.length === 0) hints.push('Search rooms carefully and take anything useful. The gatehouse has a torch.');
  if (!hasLight() && GS.visitedRooms.includes('gatehouse')) hints.push("You'll need a light source for dark areas. Check the gatehouse or kitchen.");
  if (!GS.equipped.weapon) hints.push('Find a weapon before engaging enemies. The training yard might have something.');
  if (GS.questLog.length === 0) hints.push('Talk to the people you meet. They may need help—and help you in return.');
  if (GS.questLog.includes('heal_knight') && !GS.completedQuests.includes('heal_knight')) hints.push('The wounded knight needs a healing potion. Check the pantry.');
  if (GS.questLog.includes('free_thief') && !GS.completedQuests.includes('free_thief')) hints.push('The thief needs a key. There should be one in the gatehouse.');
  if (!GS.flags.hiddenPassageFound && GS.visitedRooms.includes('reading_nook')) hints.push("The reading nook has a peculiar red-bound book. Try pushing it.");
  if (GS.visitedRooms.includes('rune_chamber') && !GS.flags.runesSolved) hints.push('The rune chamber pattern matches the star charts from the observatory.');
  if (hasItem('crystal_shard_1') || hasItem('crystal_shard_2') || hasItem('crystal_shard_3')) hints.push('Crystal shards can be combined. Collect all three and try "combine shards".');
  if (!hasItem('amulet_of_warding') && GS.visitedRooms.includes('shadow_halls')) hints.push('The Shadow Lord is nearly invincible without the Amulet of Warding. Find the Ancient Shrine.');

  if (hints.length === 0) hints.push('Explore deeper. The Keep has many secrets yet to reveal.');
  print('A whisper in the walls: "' + pick(hints) + '"', 'text-cyan');
}

function doCarve(args) {
  if (!args) { print('Carve what message?', 'error-msg'); return; }
  if (args.length > 100) { print('The stone can only hold so many words.', 'text-dim'); return; }
  const saved = JSON.parse(localStorage.getItem('hollowkeep_runes') || '[]');
  saved.push({ text: args, author: 'You' });
  if (saved.length > 10) saved.shift();
  localStorage.setItem('hollowkeep_runes', JSON.stringify(saved));
  print('You carve your message into the stone: "' + args + '"', 'text-green');
  print('Perhaps another adventurer will find it someday.', 'text-dim');
  renderRuneWall();
}

function doTrade(args) {
  const room = ROOMS[GS.currentRoom];
  if (!room.npcs || !room.npcs.includes('merchant_ghost')) {
    print("There's nobody to trade with here.", 'error-msg');
    return;
  }
  const merchant = NPCS.merchant_ghost;
  if (!args || args === '') {
    print('<span class="npc-name">Bartholomew\'s Wares:</span>', '');
    for (const [id, price] of Object.entries(merchant.inventory)) {
      print('  ' + ITEMS[id].name + ' — ' + price + ' gold', 'text-green');
    }
    print('');
    print("Type 'buy [item]' to purchase, or 'sell [item]' to sell.", 'text-dim');
    print("Sell values: Gold Coins (25g), Gemstone (50g), misc (5g)", 'text-dim');
    return;
  }

  // handled by buy/sell
}

function doBuy(item) {
  const merchant = NPCS.merchant_ghost;
  for (const [id, price] of Object.entries(merchant.inventory)) {
    if (matchItem(id, item)) {
      if (GS.gold >= price) {
        GS.gold -= price;
        GS.inventory.push(id);
        print("'Pleasure doing business!' You receive: " + ITEMS[id].name, 'success-msg');
      } else {
        print("'You haven't got the gold for that, friend.' (Need " + price + ', have ' + GS.gold + ')', 'text-amber');
      }
      return;
    }
  }
  print("Bartholomew doesn't have that in stock.", 'text-dim');
}

function doBrew() {
  const room = ROOMS[GS.currentRoom];
  if (!room.npcs || !room.npcs.includes('mad_alchemist')) {
    print("There's nobody here to brew potions.", 'error-msg');
    return;
  }
  if (hasItem('healing_herb') && hasItem('holy_water')) {
    GS.inventory = GS.inventory.filter(i => i !== 'healing_herb' && i !== 'holy_water');
    GS.inventory.push('antidote');
    GS.itemsFound++;
    print("The alchemist combines the moonpetal and holy water with practiced hands. The mixture fizzes, turns green, then settles. 'An Antidote of Warding. Cures shadow corruption. You'll want that where you're going.'", 'npc-speech');
    print('Obtained: Antidote', 'text-amber');
  } else if (hasItem('healing_herb') && hasItem('empty_vial')) {
    GS.inventory = GS.inventory.filter(i => i !== 'healing_herb' && i !== 'empty_vial');
    GS.inventory.push('healing_potion');
    GS.itemsFound++;
    print("The alchemist crushes the moonpetal into the vial and adds a catalyst. 'Simple but effective. A healing draught.'", 'npc-speech');
    print('Obtained: Healing Potion', 'text-amber');
  } else {
    print("'Bring me ingredients! Moonpetal and holy water for an antidote. Moonpetal and an empty vial for a healing potion.'", 'npc-speech');
  }
}

function doHelp() {
  print('=== COMMANDS ===', 'text-amber');
  print('');
  print('MOVEMENT', 'text-amber');
  print('  north/south/east/west/up/down (or n/s/e/w/u/d)', 'text-green');
  print('  go [direction]', 'text-green');
  print('');
  print('EXPLORATION', 'text-amber');
  print('  look (l)        — Describe current room', 'text-green');
  print('  examine (x) [thing] — Examine something closely', 'text-green');
  print('  search           — Search the room thoroughly', 'text-green');
  print('  map (m)          — Show explored areas', 'text-green');
  print('  push [thing]     — Push something', 'text-green');
  print('');
  print('ITEMS', 'text-amber');
  print('  take/get [item]  — Pick up an item (or "take all")', 'text-green');
  print('  drop [item]      — Drop an item', 'text-green');
  print('  use [item]       — Use an item', 'text-green');
  print('  equip [item]     — Equip weapon/armor', 'text-green');
  print('  unequip [item]   — Remove equipment', 'text-green');
  print('  inventory (i)    — List your items', 'text-green');
  print('  combine [items]  — Combine items together', 'text-green');
  print('  read [item]      — Read a document or book', 'text-green');
  print('');
  print('INTERACTION', 'text-amber');
  print('  talk [person]    — Talk to someone', 'text-green');
  print('  ask [topic]      — Ask about a topic', 'text-green');
  print('  answer [text]    — Answer a question', 'text-green');
  print('  give [item]      — Give an item to someone', 'text-green');
  print('  trade/buy/sell   — Trade with merchants', 'text-green');
  print('  brew             — Brew potions (with alchemist)', 'text-green');
  print('');
  print('COMBAT', 'text-amber');
  print('  attack [enemy]   — Attack an enemy', 'text-green');
  print('  cast [spell]     — Cast a known spell', 'text-green');
  print('  flee             — Attempt to run from combat', 'text-green');
  print('');
  print('OTHER', 'text-amber');
  print('  rest             — Rest and heal (if safe)', 'text-green');
  print('  stats            — Show character details', 'text-green');
  print('  quests           — Show quest log', 'text-green');
  print('  carve [message]  — Leave a message on the rune wall', 'text-green');
  print('  lore             — Read the Keep\'s history', 'text-green');
  print('  hint             — Consult the spirits for guidance', 'text-green');
  print('  save / load      — Save or load your game', 'text-green');
  print('  clear            — Clear the screen', 'text-green');
  print('  verbose          — Toggle verbose descriptions', 'text-green');
  print('  help (?)         — Show this list', 'text-green');
}

// === OPEN / UNLOCK ===

function doOpen(args) {
  if (!args) { print('Open what?', 'error-msg'); return; }

  if (GS.currentRoom === 'cell_block' && (args.includes('cell') || args.includes('door') || args.includes('lock'))) {
    const rs = roomStates.cell_block;
    if (rs.unlocked) { print("It's already open.", 'text-dim'); return; }
    if (hasItem('iron_key')) {
      rs.unlocked = true;
      print('The iron key turns with a grinding protest. The cell door swings open.', 'success-msg');
      if (NPCS.imprisoned_thief.quest && !NPCS.imprisoned_thief.quest.completed) {
        doGive('');
      }
    } else if (hasItem('lockpicks')) {
      rs.unlocked = true;
      print('You work the lockpicks with care. After a tense minute, the mechanism yields.', 'success-msg');
      if (NPCS.imprisoned_thief.quest && !NPCS.imprisoned_thief.quest.completed) {
        doGive('');
      }
    } else {
      print("It's locked. You need a key or lockpicks.", 'error-msg');
    }
    return;
  }

  if (args.includes('sarcophagus') && GS.currentRoom === 'crypt') {
    print('You heave the marble lid aside. Inside: not a body, but a rectangular window into absolute darkness. The void is perfect and complete. At the edge, something gleams—items resting on the lip of nothingness.', 'text-white');
    return;
  }

  print("You can't open that.", 'text-dim');
}

// === SHADOW LORD ENDING ===

function handleShadowLordDefeat() {
  print('');
  print('The Shadow Lord—Lord Malachar Vane—lies defeated. The Scepter of Aethon', 'text-white');
  print('pulses on the ground before you, its dark energy beckoning.', 'text-white');
  print('');
  print('Behind the throne, a passage opens, revealing a chamber of white stone.', 'text-amber');
  print('');
  print('You have a choice:', 'text-bright');
  print('');
  print('  1. Take the Scepter — Claim its power. Become the new Shadow Lord.', 'text-red');
  print('     (Type "take scepter")', 'text-dim');
  print('');
  print('  2. Enter the Sanctum — Seek another way. The Crown of Endings awaits.', 'text-cyan');
  print('     (Go east to the Sanctum)', 'text-dim');
  print('');
  print('  3. Destroy the Scepter — Speak the Word of Sundering upon it.', 'text-amber');
  print('     (Type "cast sunder" or "use scepter")', 'text-dim');

  ROOMS.throne_of_shadows.exits.east = 'sanctum';
  GS.flags.shadowLordDefeated = true;
}

// Add restart and ending commands to parser
const originalParse = parseCommand;
parseCommand = function(raw) {
  const input = raw.trim().toLowerCase();
  if (input === 'restart' || input === 'new game' || input === 'newgame') {
    GS = defaultState();
    initRoomStates();
    for (const npc of Object.values(NPCS)) {
      if (npc.quest) { npc.quest.active = false; npc.quest.completed = false; }
      if (npc.riddleSolved !== undefined) npc.riddleSolved = false;
    }
    outputEl().innerHTML = '';
    print('A new journey begins...', 'text-amber');
    print('');
    printRoom('moor_path');
    GS.gameStarted = true;
    updatePanels();
    return;
  }

  if (input === 'buy' || input.startsWith('buy ')) {
    const what = input.replace(/^buy\s*/, '');
    if (!what) { doTrade(''); return; }
    doBuy(what);
    updatePanels();
    return;
  }

  if (input === 'sell' || input.startsWith('sell ')) {
    const what = input.replace(/^sell\s*/, '');
    if (!what) { print('Sell what?', 'error-msg'); return; }
    const idx = GS.inventory.findIndex(id => matchItem(id, what));
    if (idx === -1) { print("You don't have that.", 'error-msg'); return; }
    const room = ROOMS[GS.currentRoom];
    if (!room.npcs || !room.npcs.includes('merchant_ghost')) { print("There's nobody to sell to here.", 'error-msg'); return; }
    const id = GS.inventory[idx];
    const item = ITEMS[id];
    const value = item.value || 5;
    GS.inventory.splice(idx, 1);
    GS.gold += value;
    print("'A fine piece!' Bartholomew takes the " + item.name + ". (+" + value + " gold)", 'success-msg');
    updatePanels();
    return;
  }

  if (GS.flags.shadowLordDefeated && !GS.gameWon) {
    if (input === 'take scepter' || input === 'grab scepter' || input === 'get scepter') {
      GS.gameWon = true;
      GS.ending = 'power';
      GS.inventory.push('scepter_of_aethon');
      showEnding('power');
      return;
    }
  }

  if (GS.currentRoom === 'sanctum' && !GS.gameWon) {
    if ((input === 'take crown' || input === 'wear crown' || input === 'use crown' || input === 'get crown') && !GS.gameWon) {
      GS.gameWon = true;
      GS.ending = 'sacrifice';
      showEnding('sacrifice');
      return;
    }
  }

  if (GS.flags.shadowLordDefeated && !GS.gameWon && (input === 'cast sunder' || input === 'destroy scepter')) {
    GS.gameWon = true;
    GS.ending = 'destruction';
    showEnding('destruction');
    return;
  }

  originalParse.call(this, raw);
};

function showEnding(type) {
  printLine();
  print('');

  if (type === 'power') {
    print('  E N D I N G :  T H E   N E W   L O R D', 'text-red text-bold');
    print('');
    print('  You grasp the Scepter. Power floods through you—vast,', 'text-white');
    print('  intoxicating, terrible. The shadows of the Keep bend to', 'text-white');
    print('  your will. The throne calls. You sit.', 'text-white');
    print('');
    print('  The Keep shudders, acknowledging its new master. You can', 'text-white');
    print('  feel every stone, every shadow, every whisper within its', 'text-white');
    print('  walls. You are the Keep. The Keep is you.', 'text-white');
    print('');
    print('  Outside, on the moors, the fog thickens. The Keep stands', 'text-white');
    print('  eternal, waiting for the next adventurer to challenge its', 'text-white');
    print('  new lord.', 'text-white');
    print('');
    print('  You chose power. The cycle continues.', 'text-red');
  } else if (type === 'sacrifice') {
    print('  E N D I N G :  T H E   S A C R I F I C E', 'text-cyan text-bold');
    print('');
    print('  You place the Crown of Endings upon your head. Starlight', 'text-white');
    print('  fills your vision. You understand, suddenly and completely,', 'text-white');
    print('  what must be done.', 'text-white');
    print('');
    print('  The door between worlds begins to close. The Keep groans,', 'text-white');
    print('  stone grinding against stone, reality folding. The shadows', 'text-white');
    print('  scream. You hold firm.', 'text-white');
    print('');
    print('  When it is done, the Keep vanishes from the moors. The fog', 'text-white');
    print('  lifts. Sunlight touches Ashenvale for the first time in a', 'text-white');
    print('  thousand years. The door is sealed forever.', 'text-white');
    print('');
    print('  You remain, the final seal, in a place between worlds—', 'text-white');
    print('  alone, but at peace. The cage is locked. The sacrifice holds.', 'text-white');
    print('');
    print('  You chose sacrifice. The cycle is broken.', 'text-cyan');
  } else if (type === 'destruction') {
    print('  E N D I N G :  T H E   S U N D E R I N G', 'text-amber text-bold');
    print('');
    print('  You speak the Word of Sundering upon the Scepter. The', 'text-white');
    print('  artifact cracks, screams, and explodes in a burst of', 'text-white');
    print('  shadow and light.', 'text-white');
    print('');
    print('  The Keep begins to collapse. Not physically—but', 'text-white');
    print('  existentially. Walls fade. Floors dissolve. The boundary', 'text-white');
    print('  between worlds tears open completely.', 'text-white');
    print('');
    print('  You run. Behind you, the Keep folds in on itself like', 'text-white');
    print('  a closing fist. You burst through the outer gate moments', 'text-white');
    print('  before it ceases to exist.', 'text-white');
    print('');
    print('  On the moor, you turn. Where the Keep stood, there is', 'text-white');
    print('  nothing—not even a foundation. Just moor grass and', 'text-white');
    print('  silence. But in the sky above that spot, the stars', 'text-white');
    print('  flicker strangely, and you know the door is not closed.', 'text-white');
    print('  Merely... unhinged.', 'text-white');
    print('');
    print('  You chose destruction. The cycle is shattered—', 'text-amber');
    print('  but what comes next may be worse.', 'text-amber');
  }

  print('');
  printLine();
  print('  Rooms explored: ' + GS.roomsDiscovered + '/' + Object.keys(ROOMS).length, 'text-dim');
  print('  Items found: ' + GS.itemsFound, 'text-dim');
  print('  Deaths: ' + GS.deaths, 'text-dim');
  print('  Turns: ' + GS.turnCount, 'text-dim');
  print('  Quests completed: ' + GS.completedQuests.length, 'text-dim');
  print('');
  print("  Type 'restart' to begin a new journey.", 'text-amber');
  printLine();
}

// === BOOT SEQUENCE ===

function runBootSequence() {
  const bootEl = document.getElementById('boot-text');
  const lines = [
    { text: '> Establishing connection to hollowkeep.net:6660...', cls: 'line-dim', delay: 0 },
    { text: '> Negotiating protocol... done', cls: 'line-dim', delay: 800 },
    { text: '> Connection established.', cls: 'line-bright', delay: 400 },
    { text: '', cls: '', delay: 300 },
    { text: '> Loading world state.............. done', cls: 'line-dim', delay: 1200 },
    { text: '> Verifying structural integrity... ok', cls: 'line-dim', delay: 600 },
    { text: '> Synchronizing shadow layer....... ok', cls: 'line-dim', delay: 500 },
    { text: '', cls: '', delay: 200 },
    { text: '> Server uptime: ' + (1247 + Math.floor(Math.random() * 100)) + ' days', cls: 'line-dim', delay: 300 },
    { text: '> Last world reset: never', cls: 'line-dim', delay: 200 },
    { text: '> Active adventurers: ' + rng(3, 12), cls: 'line-dim', delay: 200 },
    { text: '> Deaths today: ' + rng(15, 42), cls: 'line-red', delay: 200 },
    { text: '', cls: '', delay: 400 },
    { text: CASTLE_ART, cls: 'line-bright', delay: 100, pre: true },
    { text: '', cls: '', delay: 200 },
    { text: '═'.repeat(56), cls: 'line-amber', delay: 100 },
    { text: '  THE HOLLOWED KEEP  ·  A Text Adventure', cls: 'line-bright', delay: 100 },
    { text: '  Est. 993 A.D.  ·  Version 2.17', cls: 'line-dim', delay: 100 },
    { text: '  hollowkeep.net:6660', cls: 'line-dim', delay: 100 },
    { text: '═'.repeat(56), cls: 'line-amber', delay: 100 },
    { text: '', cls: '', delay: 300 },
    { text: '  "The Keep appeared one moonless night. None knew its origin.', cls: 'line-white', delay: 100 },
    { text: '   At its heart, the Scepter of Aethon—a relic of shadow and', cls: 'line-white', delay: 100 },
    { text: '   flame—calls to those bold enough to claim it."', cls: 'line-white', delay: 100 },
    { text: '', cls: '', delay: 300 },
    { text: "  Type 'begin' to enter the Keep, or 'load' to restore a save.", cls: 'line-cyan', delay: 100 },
    { text: "  Type 'lore' for history, 'help' for commands.", cls: 'line-dim', delay: 100 },
    { text: '', cls: '', delay: 200 },
  ];

  let totalDelay = 0;
  for (const line of lines) {
    totalDelay += line.delay;
    setTimeout(() => {
      if (line.pre) {
        const pre = document.createElement('pre');
        pre.className = 'line ' + line.cls;
        pre.textContent = line.text;
        pre.style.fontSize = '0.5rem';
        pre.style.lineHeight = '1.1';
        bootEl.appendChild(pre);
      } else {
        const div = document.createElement('div');
        div.className = 'line ' + line.cls;
        div.textContent = line.text;
        bootEl.appendChild(div);
      }
      bootEl.scrollTop = bootEl.scrollHeight;
    }, totalDelay);
  }

  setTimeout(() => {
    const prompt = document.getElementById('boot-prompt');
    prompt.classList.remove('hidden');
    const bootInput = document.getElementById('boot-input');
    bootInput.focus();
    bootInput.addEventListener('keydown', handleBootInput);
  }, totalDelay + 300);
}

function handleBootInput(e) {
  if (e.key !== 'Enter') return;
  const input = e.target.value.trim().toLowerCase();
  e.target.value = '';

  if (input === 'begin' || input === 'start' || input === 'play' || input === 'enter') {
    startGame();
  } else if (input === 'load' || input === 'restore') {
    startGame(true);
  } else if (input === 'lore' || input === 'history') {
    const bootEl = document.getElementById('boot-text');
    const div = document.createElement('div');
    div.className = 'line line-white';
    div.innerHTML = '\n  The Hollowed Keep appeared on the moors of Ashenvale one moonless\n  night in 993 A.D. Lord Aldric Vane summoned it from between worlds\n  using the Scepter of Aethon. Each lord of the Vane dynasty wielded\n  the Scepter, each consumed by its power. The last—Lord Malachar—\n  became the Shadow Lord, bound to the throne for eternity.\n\n  Many have entered seeking the Scepter. Few have returned.\n  The Keep endures.\n\n  Type \'begin\' to enter.\n';
    bootEl.appendChild(div);
    bootEl.scrollTop = bootEl.scrollHeight;
  } else if (input === 'help') {
    const bootEl = document.getElementById('boot-text');
    const div = document.createElement('div');
    div.className = 'line line-dim';
    div.textContent = "\n  'begin' - Start a new game\n  'load'  - Load a saved game\n  'lore'  - Read the Keep's history\n";
    bootEl.appendChild(div);
    bootEl.scrollTop = bootEl.scrollHeight;
  } else {
    const bootEl = document.getElementById('boot-text');
    const div = document.createElement('div');
    div.className = 'line line-dim';
    div.textContent = "  Unknown command. Type 'begin' to enter the Keep.";
    bootEl.appendChild(div);
    bootEl.scrollTop = bootEl.scrollHeight;
  }
}

function startGame(loadSave) {
  document.getElementById('boot-screen').classList.add('hidden');
  document.getElementById('game-container').classList.remove('hidden');

  if (window.innerWidth <= 900) {
    document.getElementById('mobile-tabs').classList.remove('hidden');
    showMobilePanel('center-panel');
  }

  document.getElementById('castle-art').textContent = CASTLE_ART;

  initRoomStates();
  initChronicle();

  if (loadSave) {
    const loaded = loadGame();
    if (!loaded) {
      GS.gameStarted = true;
      printRoom('moor_path');
    }
  } else {
    GS.gameStarted = true;
    print('You step onto the moor path. The fog closes behind you like a curtain.', 'text-amber');
    print('There is no going back.', 'text-dim');
    print('');
    printRoom('moor_path');
  }

  const cmdInput = inputEl();
  cmdInput.focus();
  cmdInput.addEventListener('keydown', handleGameInput);
}

function handleGameInput(e) {
  if (e.key === 'Enter') {
    const input = inputEl().value;
    inputEl().value = '';
    if (input.trim()) parseCommand(input);
  } else if (e.key === 'ArrowUp') {
    e.preventDefault();
    if (GS.commandHistory.length > 0) {
      GS.historyIndex = Math.min(GS.historyIndex + 1, GS.commandHistory.length - 1);
      inputEl().value = GS.commandHistory[GS.historyIndex];
    }
  } else if (e.key === 'ArrowDown') {
    e.preventDefault();
    if (GS.historyIndex > 0) {
      GS.historyIndex--;
      inputEl().value = GS.commandHistory[GS.historyIndex];
    } else {
      GS.historyIndex = -1;
      inputEl().value = '';
    }
  }
}

// === MOBILE TABS ===

function showMobilePanel(panelId) {
  document.querySelectorAll('#left-panel, #center-panel, #right-panel').forEach(p => {
    p.classList.remove('mobile-visible');
    p.style.display = '';
  });
  document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));

  const panel = document.getElementById(panelId);
  if (panelId !== 'center-panel') {
    panel.classList.add('mobile-visible');
  }
  document.querySelector(`.tab-btn[data-panel="${panelId}"]`).classList.add('active');

  if (panelId === 'center-panel') {
    inputEl().focus();
  }
}

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      showMobilePanel(btn.dataset.panel);
    });
  });
});

// === AMBIENT MESSAGES ===

let ambientTimer = null;

function startAmbient() {
  const messages = [
    'The walls whisper. You cannot make out the words.',
    'A cold draft stirs the dust.',
    'Somewhere distant, a door creaks open. Then shuts.',
    'You hear footsteps above you. Or below. Hard to tell.',
    'The shadows seem to deepen for a moment, then recede.',
    'A faint smell of smoke drifts through the air.',
    'The stone beneath your feet vibrates, barely perceptibly.',
    'For an instant, you see movement in your peripheral vision. Nothing is there.',
    'A distant bell tolls once. Silence follows.',
    'The flame of your light source flickers, though there is no breeze.',
    'You feel watched.',
    'The temperature drops suddenly, then normalizes.',
  ];

  ambientTimer = setInterval(() => {
    if (!GS.gameStarted || GS.gameWon || GS.inCombat) return;
    if (Math.random() < 0.3) {
      print('');
      print(pick(messages), 'system-msg');
    }
  }, 90000);
}

// === INITIALIZATION ===

document.addEventListener('DOMContentLoaded', () => {
  runBootSequence();
  startAmbient();

  document.body.addEventListener('click', () => {
    const bootInput = document.getElementById('boot-input');
    const cmdInput = inputEl();
    if (bootInput && !document.getElementById('boot-screen').classList.contains('hidden')) {
      bootInput.focus();
    } else if (cmdInput) {
      cmdInput.focus();
    }
  });
});
