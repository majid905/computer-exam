-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 04, 2026 at 05:59 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `passpilot`
--

-- --------------------------------------------------------

--
-- Table structure for table `activity_logs`
--

CREATE TABLE `activity_logs` (
  `id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `action` varchar(255) NOT NULL,
  `module` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `ip_address` varchar(100) DEFAULT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `activity_logs`
--

INSERT INTO `activity_logs` (`id`, `user_id`, `action`, `module`, `description`, `ip_address`, `created_at`, `updated_at`) VALUES
(1, NULL, 'database_seed', 'system', 'Initial database seed completed with all 28 tables', '127.0.0.1', '2026-06-03 09:56:19', '2026-06-03 09:56:19');

-- --------------------------------------------------------

--
-- Table structure for table `app_settings`
--

CREATE TABLE `app_settings` (
  `id` int(11) NOT NULL,
  `site_name` varchar(255) NOT NULL DEFAULT 'Passpilot',
  `site_tagline` varchar(255) DEFAULT 'AI-powered exam coach',
  `logo` varchar(500) DEFAULT NULL,
  `favicon` varchar(500) DEFAULT NULL,
  `support_email` varchar(255) DEFAULT NULL,
  `support_phone` varchar(50) DEFAULT NULL,
  `facebook` varchar(500) DEFAULT NULL,
  `instagram` varchar(500) DEFAULT NULL,
  `youtube` varchar(500) DEFAULT NULL,
  `twitter` varchar(500) DEFAULT NULL,
  `terms_conditions` text DEFAULT NULL,
  `privacy_policy` text DEFAULT NULL,
  `about_us` text DEFAULT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `app_settings`
--

INSERT INTO `app_settings` (`id`, `site_name`, `site_tagline`, `logo`, `favicon`, `support_email`, `support_phone`, `facebook`, `instagram`, `youtube`, `twitter`, `terms_conditions`, `privacy_policy`, `about_us`, `created_at`, `updated_at`) VALUES
(1, 'Passpilot', 'AI-powered exam coach', NULL, NULL, 'support@passpilot.ca', '+1-800-123-4567', 'https://facebook.com/passpilot', 'https://instagram.com/passpilot', 'https://youtube.com/passpilot', 'https://twitter.com/passpilot', NULL, NULL, NULL, '2026-06-03 09:56:19', '2026-06-03 09:56:19');

-- --------------------------------------------------------

--
-- Table structure for table `banners`
--

CREATE TABLE `banners` (
  `id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `subtitle` varchar(255) DEFAULT NULL,
  `image` varchar(500) DEFAULT NULL,
  `button_text` varchar(255) DEFAULT NULL,
  `button_link` varchar(500) DEFAULT NULL,
  `status` enum('active','inactive') NOT NULL DEFAULT 'active',
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `banners`
--

INSERT INTO `banners` (`id`, `title`, `subtitle`, `image`, `button_text`, `button_link`, `status`, `created_at`, `updated_at`) VALUES
(1, 'Pass Your Canadian Citizenship Test', 'Study smarter with AI-powered practice questions and mock exams.', NULL, 'Get Started', '/onboarding', 'active', '2026-06-03 09:56:19', '2026-06-03 09:56:19'),
(2, 'Discover Canada Guide', 'All chapters, questions, and progress tracking in one place.', NULL, 'Explore Chapters', '/chapters', 'active', '2026-06-03 09:56:19', '2026-06-03 09:56:19');

-- --------------------------------------------------------

--
-- Table structure for table `blogs`
--

CREATE TABLE `blogs` (
  `id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `slug` varchar(255) NOT NULL,
  `image` varchar(500) DEFAULT NULL,
  `short_description` text DEFAULT NULL,
  `content` longtext DEFAULT NULL,
  `author_id` int(11) DEFAULT NULL,
  `status` enum('active','inactive') NOT NULL DEFAULT 'active',
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `blogs`
--

INSERT INTO `blogs` (`id`, `title`, `slug`, `image`, `short_description`, `content`, `author_id`, `status`, `created_at`, `updated_at`) VALUES
(1, 'Top 10 Tips to Pass Your Citizenship Test', 'top-10-tips', NULL, 'Essential strategies for acing the Canadian citizenship exam.', 'Detailed content about tips...', NULL, 'active', '2026-06-03 09:56:19', '2026-06-03 09:56:19'),
(2, 'How to Study Discover Canada Effectively', 'study-discover-canada', NULL, 'A comprehensive guide to studying the official guide.', 'Detailed content about studying...', NULL, 'active', '2026-06-03 09:56:19', '2026-06-03 09:56:19'),
(3, 'Success Story: From PR to Citizen in 3 Years', 'success-story-pr-to-citizen', NULL, 'Real story of a successful citizenship journey.', 'Detailed content about the journey...', NULL, 'active', '2026-06-03 09:56:19', '2026-06-03 09:56:19');

-- --------------------------------------------------------

--
-- Table structure for table `blog_categories`
--

CREATE TABLE `blog_categories` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `slug` varchar(255) NOT NULL,
  `status` enum('active','inactive') NOT NULL DEFAULT 'active',
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `blog_categories`
--

INSERT INTO `blog_categories` (`id`, `name`, `slug`, `status`, `created_at`, `updated_at`) VALUES
(1, 'Citizenship Tips', 'citizenship-tips', 'active', '2026-06-03 09:56:19', '2026-06-03 09:56:19'),
(2, 'Study Guides', 'study-guides', 'active', '2026-06-03 09:56:19', '2026-06-03 09:56:19'),
(3, 'Success Stories', 'success-stories', 'active', '2026-06-03 09:56:19', '2026-06-03 09:56:19');

-- --------------------------------------------------------

--
-- Table structure for table `blog_category_relations`
--

CREATE TABLE `blog_category_relations` (
  `id` int(11) NOT NULL,
  `blog_id` int(11) NOT NULL,
  `blog_category_id` int(11) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `blog_category_relations`
--

INSERT INTO `blog_category_relations` (`id`, `blog_id`, `blog_category_id`, `created_at`, `updated_at`) VALUES
(1, 1, 1, '2026-06-03 09:56:19', '2026-06-03 09:56:19'),
(2, 2, 2, '2026-06-03 09:56:19', '2026-06-03 09:56:19'),
(3, 3, 3, '2026-06-03 09:56:19', '2026-06-03 09:56:19');

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

CREATE TABLE `categories` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `slug` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `icon` varchar(255) DEFAULT NULL,
  `image` varchar(500) DEFAULT NULL,
  `status` enum('active','inactive') NOT NULL DEFAULT 'active',
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`id`, `name`, `slug`, `description`, `icon`, `image`, `status`, `created_at`, `updated_at`) VALUES
(1, 'Discover Canada', 'discover-canada', 'Official study guide for the Canadian citizenship test', NULL, NULL, 'active', '2026-06-03 09:56:18', '2026-06-03 09:56:18');

-- --------------------------------------------------------

--
-- Table structure for table `chapters`
--

CREATE TABLE `chapters` (
  `id` int(11) NOT NULL,
  `category_id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `slug` varchar(255) NOT NULL,
  `short_description` text DEFAULT NULL,
  `pdf_link` varchar(500) DEFAULT NULL,
  `body` longtext DEFAULT NULL,
  `image` varchar(500) DEFAULT NULL,
  `status` enum('active','inactive') NOT NULL DEFAULT 'active',
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `chapters`
--

INSERT INTO `chapters` (`id`, `category_id`, `title`, `slug`, `short_description`, `pdf_link`, `body`, `image`, `status`, `created_at`, `updated_at`) VALUES
(1, 1, 'Applying for Citizenship', 'applying', 'Pages 8-10', NULL, '{\"intro\":\"The basics of applying for and earning Canadian citizenship.\",\"sections\":[{\"heading\":\"The citizenship test\",\"points\":[\"Usually a written test, but it can be an interview.\",\"Tests two things: knowledge of Canada and adequate knowledge of English or French.\",\"Adults aged 18–54 must pass; applicants 55 and over do not have to write the test.\",\"All questions are based on this guide — every fact you need is in Discover Canada.\"]},{\"heading\":\"Getting ready\",\"points\":[\"Study this guide, practise with a friend or family member, and use citizenship classes if available.\",\"Free English/French language classes are offered by the Government of Canada.\",\"Keep the Call Centre updated with your correct address during processing.\"]},{\"heading\":\"The ceremony\",\"points\":[\"If you pass and meet all other requirements, you receive a Notice to Appear to Take the Oath of Citizenship.\",\"At the ceremony you take the Oath of Citizenship, sign the oath form, and receive your Canadian Citizenship Certificate.\",\"Family and friends are encouraged to attend.\"]}]}', NULL, 'active', '2026-06-03 09:56:18', '2026-06-03 17:33:48'),
(2, 1, 'Rights and Responsibilities of Citizenship', 'rights', 'Pages 11-15', NULL, '{\"intro\":\"Where Canadian rights come from, what the Charter guarantees, and the responsibilities that come with citizenship.\",\"sections\":[{\"heading\":\"Where our rights come from\",\"points\":[\"Magna Carta (1215, \'the Great Charter of Freedoms\') — the historical root of Canadian rights.\",\"English common law and the French civil code shape Canadian law.\",\"Anglo-Saxon Christian and Hebrew religious traditions influenced our values.\",\"Habeas corpus — the right to challenge unlawful detention — comes from English common law.\"]},{\"heading\":\"The Canadian Charter of Rights and Freedoms (1982)\",\"points\":[\"Part of the Constitution Act, 1982, signed by Queen Elizabeth II.\",\"Recognizes Aboriginal and treaty rights of First Nations, Inuit and Métis peoples.\",\"Four fundamental freedoms: (1) conscience and religion; (2) thought, belief, opinion and expression including press; (3) peaceful assembly; (4) association.\",\"Democratic rights: right to vote, and elections at least every five years (except in war or emergency).\",\"Mobility rights: live and work anywhere in Canada, enter and leave the country, apply for a passport.\",\"Legal rights, equality rights, official language rights, and minority-language education rights.\"]},{\"heading\":\"Responsibilities of citizenship\",\"points\":[\"Obey the law — no person or group is above the law.\",\"Take responsibility for yourself and your family.\",\"Serve on a jury when called.\",\"Vote in elections.\",\"Help others in the community.\",\"Protect and enjoy our heritage and environment.\",\"Defending Canada is not compulsory, but service in the Canadian Forces (regular or reserve) or police is a noble way to contribute.\"]},{\"heading\":\"Equality of women and men\",\"points\":[\"Men and women are equal under the law.\",\"Canada\'s openness does not extend to barbaric cultural practices — spousal abuse, \'honour killings,\' female genital mutilation, forced marriage or other gender-based violence are crimes.\"]}]}', NULL, 'active', '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(3, 1, 'Who We Are', 'who', 'Pages 16-22', NULL, '{\"intro\":\"Who Canadians are: the three founding peoples, languages, and the makeup of modern Canada.\",\"sections\":[{\"heading\":\"Three founding peoples\",\"points\":[\"Aboriginal, French and British peoples are the three founding peoples of Canada.\",\"Most Canadians today are descended from settlers, with newcomers added over centuries.\"]},{\"heading\":\"Aboriginal peoples\",\"points\":[\"Three groups: First Nations (Indians), Métis, and Inuit.\",\"First Nations are about 65% of the Aboriginal population; about half live on reserve land.\",\"Métis are a distinct people of mixed Aboriginal and European ancestry; majority live on the Prairies; they speak Michif.\",\"Inuit, meaning \'the people\' in Inuktitut, live in small Arctic communities across Nunavut, Northwest Territories, Northern Quebec and Labrador.\",\"Indian Residential Schools (1800s–1980s) caused enduring harm; the Government of Canada apologized in 2008.\"]},{\"heading\":\"English- and French-speaking Canadians\",\"points\":[\"Canada\'s two official languages are English and French.\",\"About 18 million Anglophones (first language English) and 7 million Francophones (first language French).\",\"Most Francophones live in Quebec; about 1 million Francophones live outside Quebec, including Acadians and Franco-Ontarians.\",\"Acadians are descendants of French colonists who began settling in the Maritimes in 1604.\",\"Quebecers — most live in Quebec; the majority are French-speaking and Roman Catholic.\",\"Allophones are residents whose first language learned is neither English nor French.\"]},{\"heading\":\"Diversity in Canada\",\"points\":[\"Canada is home to many cultures, ethnic and racial groups, and religions.\",\"The largest religious affiliation is Christian; freedom of religion is guaranteed by the Charter.\"]}]}', NULL, 'active', '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(4, 1, 'Canada\'s History', 'history', 'Pages 23-44', NULL, '{\"intro\":\"From the first Aboriginal peoples to modern Canada — the key moments, people, and dates the test asks about.\",\"sections\":[{\"heading\":\"Early Canada (before 1763)\",\"points\":[\"Aboriginal peoples lived in what is now Canada for thousands of years before Europeans arrived.\",\"Norse Vikings established a brief settlement at L\'Anse aux Meadows around 1000 AD.\",\"John Cabot reached Newfoundland in 1497, claiming it for England.\",\"Jacques Cartier made three voyages (1534, 1535, 1541) and gave Canada its name from the Iroquoian word \'kanata\' (village).\",\"Samuel de Champlain founded Quebec City in 1608 and is known as the \'Father of New France.\'\",\"King Louis XIV made Canada a royal province (royal government) in 1663.\",\"Hudson\'s Bay Company chartered in 1670; dominated the fur trade.\",\"Acadian deportation by British forces began in 1755.\"]},{\"heading\":\"British North America (1763–1867)\",\"points\":[\"Battle of the Plains of Abraham in 1759 — British under General Wolfe defeated French under General Montcalm; both died.\",\"Treaty of Paris (1763) — France ceded Canada to Britain.\",\"Quebec Act (1774) — guaranteed religious freedom for Catholics and restored French civil law; helped Quebec stay loyal during the American Revolution.\",\"Loyalists fled to Canada from the United States after 1776, bringing the first large wave of English-speaking settlers.\",\"Slavery: Sir Guy Carleton freed Black Loyalists; abolitionist John Graves Simcoe made the Act Against Slavery in Upper Canada (1793) — among the first such laws in the British Empire.\",\"War of 1812: Major-General Sir Isaac Brock and Chief Tecumseh led the defence; Laura Secord warned of an American attack at Beaver Dams (1813); the war secured Canada\'s existence.\",\"Rebellions of 1837–38 in Upper and Lower Canada led by William Lyon Mackenzie and Louis-Joseph Papineau.\",\"Lord Durham recommended uniting the colonies and granting responsible government.\",\"Sir Louis-Hippolyte La Fontaine became the first head of a responsible government in the Canadas in 1849, championing French language rights.\"]},{\"heading\":\"Confederation and growth\",\"points\":[\"Confederation: July 1, 1867 — the Dominion of Canada was created, joining Ontario, Quebec, Nova Scotia and New Brunswick.\",\"Sir John A. Macdonald, born in Scotland, was Canada\'s first Prime Minister (on the $10 bill).\",\"Sir George-Étienne Cartier was Macdonald\'s Quebec partner and a leading Father of Confederation.\",\"Manitoba joined 1870, British Columbia 1871, Prince Edward Island 1873, Yukon 1898, Alberta and Saskatchewan 1905, Newfoundland 1949.\",\"The Canadian Pacific Railway was completed in 1885, symbolizing national unity.\",\"Sir Wilfrid Laurier — first French Canadian Prime Minister (1896); on the $5 bill.\"]},{\"heading\":\"20th-century Canada\",\"points\":[\"World War I (1914–1918) — Canadian Corps captured Vimy Ridge on April 9, 1917 under General Sir Arthur Currie.\",\"Women\'s suffrage: Manitoba was the first province to grant women the vote (1916); by 1918 most female citizens 21+ could vote federally.\",\"Sir Frederick Banting and Charles Best discovered insulin in 1922 at the University of Toronto — saving millions of lives.\",\"Statute of Westminster (1931) granted Canada legal autonomy from Britain.\",\"World War II (1939–1945) — over a million Canadians served; Canadians landed at Juno Beach on D-Day (June 6, 1944) and liberated the Netherlands.\",\"Newfoundland joined Confederation on March 31, 1949.\",\"Canadians fought in the Korean War (1950–1953).\",\"Canada helped found the United Nations, NATO, and NORAD.\"]},{\"heading\":\"Modern milestones\",\"points\":[\"Tommy Douglas, Saskatchewan premier, helped create universal medicare (first plan in 1962).\",\"Canadian Bill of Rights (1960) — introduced by PM John Diefenbaker.\",\"Maple Leaf flag raised for the first time in 1965 under PM Lester B. Pearson.\",\"Official Languages Act (1969) under PM Pierre Elliott Trudeau.\",\"Multiculturalism Act (1988) reinforced Canada\'s pluralism.\",\"Canadian Charter of Rights and Freedoms adopted 1982, part of the Constitution Act, 1982, under PM Pierre Trudeau.\"]}]}', NULL, 'active', '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(5, 1, 'Modern Canada', 'modern', 'Pages 45-53', NULL, '{\"intro\":\"How modern Canada was shaped: rights, language, healthcare, and the Charter.\",\"sections\":[{\"heading\":\"Voting and rights expand\",\"points\":[\"Manitoba was first to grant women the vote in 1916.\",\"By 1918, most female citizens aged 21+ could vote in federal elections.\",\"Indigenous (First Nations) people gained the unrestricted right to vote in federal elections in 1960.\",\"Canadian Bill of Rights (1960) — predecessor to the Charter; introduced by PM Diefenbaker.\",\"Canadian Charter of Rights and Freedoms enshrined in the Constitution Act, 1982, under PM Pierre Trudeau.\"]},{\"heading\":\"Languages and identity\",\"points\":[\"Official Languages Act (1969) gave English and French equal status in the federal government.\",\"Maple Leaf flag — adopted Feb 15, 1965, under PM Lester B. Pearson; February 15 is National Flag of Canada Day.\",\"Multiculturalism Act (1988) — Canada was the first country to adopt multiculturalism as an official policy.\"]},{\"heading\":\"Universal healthcare\",\"points\":[\"Tommy Douglas, a Saskatchewan premier and Baptist minister, championed the first single-payer, universal medical insurance plan (Saskatchewan, 1962).\",\"Federal Medical Care Act extended publicly funded healthcare across Canada.\"]},{\"heading\":\"Quebec and federation\",\"points\":[\"Two Quebec referendums on sovereignty: 1980 (60% no) and 1995 (50.6% no).\",\"Quebec remains part of Canada with a distinctive French-speaking culture and civil-law tradition.\"]}]}', NULL, 'active', '2026-06-03 09:56:18', '2026-06-04 11:54:18'),
(6, 1, 'How Canadians Govern Themselves', 'govern', 'Pages 54-59', NULL, '{\"intro\":\"Canada\'s system of government: a constitutional monarchy, a parliamentary democracy, and a federal state.\",\"sections\":[{\"heading\":\"Constitutional monarchy\",\"points\":[\"Canada\'s head of state is a hereditary Sovereign (Queen or King) who reigns under the Constitution and the rule of law.\",\"The Sovereign is represented federally by the Governor General and in each province by a Lieutenant Governor.\",\"Governor General typically serves a five-year term, chosen by the PM.\"]},{\"heading\":\"Three branches of government\",\"points\":[\"Executive: the Crown, the Prime Minister, the Cabinet, and the federal public service — puts laws into effect.\",\"Legislative: the Sovereign, the Senate, and the House of Commons — makes laws.\",\"Judicial: the courts — apply and interpret the laws.\"]},{\"heading\":\"Parliament\",\"points\":[\"Three parts: the Sovereign, the Senate, and the House of Commons.\",\"Members of Parliament (MPs) are elected to the House of Commons by voters in each electoral district (riding).\",\"Senators are appointed by the Governor General on the advice of the Prime Minister and serve until age 75.\",\"There are 338 elected MPs and 105 appointed senators (numbers may change with redistribution).\"]},{\"heading\":\"Prime Minister and Cabinet\",\"points\":[\"The leader of the political party with the most MPs becomes Prime Minister.\",\"The PM chooses Cabinet ministers, who are usually MPs.\",\"Cabinet sets government policy; Cabinet ministers are responsible to the elected representatives.\"]},{\"heading\":\"Three levels of government\",\"points\":[\"Federal: national defence, foreign policy, citizenship, criminal law, currency.\",\"Provincial/territorial: education, healthcare, civil law, natural resources.\",\"Municipal (city/local): local services such as schools (administration), roads, fire and police.\"]}]}', NULL, 'active', '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(7, 1, 'Federal Elections', 'elections', 'Pages 60-74', NULL, '{\"intro\":\"How federal elections work, who can vote, and what to do on election day.\",\"sections\":[{\"heading\":\"Who can vote\",\"points\":[\"Must be a Canadian citizen.\",\"Must be at least 18 years old on voting day.\",\"Must be on the voters\' list (Elections Canada maintains the National Register of Electors).\"]},{\"heading\":\"Federal election basics\",\"points\":[\"Members of Parliament (MPs) are elected in their local constituency (riding) — one MP per riding.\",\"The party with the most elected MPs forms the government; its leader becomes Prime Minister.\",\"Majority government: party holds at least half the House seats. Minority: less than half.\",\"Maximum time between federal elections is normally about four years (fixed-date law).\"]},{\"heading\":\"On election day\",\"points\":[\"Bring your voter information card and ID showing your name and address (or follow other ID rules).\",\"Go to your polling station; an Elections Canada official gives you a ballot.\",\"Behind the voting screen, mark an X next to the name of one candidate.\",\"Fold the ballot, hand it back to the official, who puts it in the ballot box.\",\"Your ballot is secret — you are not obliged to tell anyone how you voted.\"]},{\"heading\":\"Other elections\",\"points\":[\"Provincial/territorial elections choose Members of Provincial Parliament (MPPs), MLAs, or MNAs depending on the province.\",\"Municipal elections choose mayors and councillors who run cities and towns.\"]}]}', NULL, 'active', '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(8, 1, 'The Justice System', 'justice', 'Pages 75-77', NULL, '{\"intro\":\"How Canada\'s justice system protects rights and applies the law equally to all.\",\"sections\":[{\"heading\":\"The rule of law\",\"points\":[\"The law applies equally to everyone — including the police, governments, and public officials.\",\"Every person charged with a crime is presumed innocent until proven guilty in a fair trial.\",\"Habeas corpus protects against unlawful detention.\"]},{\"heading\":\"Courts\",\"points\":[\"The Supreme Court of Canada is the final court of appeal.\",\"Federal courts and provincial/territorial courts handle most cases.\",\"Judges are appointed and are independent of the government.\"]},{\"heading\":\"Police\",\"points\":[\"The Royal Canadian Mounted Police (RCMP) is the federal police force and also serves as the provincial force in most provinces and territories.\",\"Ontario and Quebec have their own provincial police forces; many cities have municipal forces.\",\"Police keep people safe and enforce the law; you can question police about their service or conduct.\"]}]}', NULL, 'active', '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(9, 1, 'Canadian Symbols', 'symbols', 'Pages 78-89', NULL, '{\"intro\":\"The flags, emblems, anthems, sports, and honours that represent Canada.\",\"sections\":[{\"heading\":\"Flag and emblems\",\"points\":[\"Maple Leaf flag raised for the first time on February 15, 1965 — National Flag of Canada Day.\",\"The Canadian Crown is the symbol of our parliamentary democracy.\",\"The Royal Coat of Arms features the symbols of the founding peoples: English rose, Scottish thistle, Irish shamrock, and French fleurs-de-lys, plus maple leaves.\",\"National motto: \'A mari usque ad mare\' (From sea to sea).\",\"The beaver became an emblem through the fur trade; it appears on the Canadian five-cent coin.\",\"The maple tree is the national tree; the maple leaf is the central national symbol.\"]},{\"heading\":\"Anthems\",\"points\":[\"\'O Canada\' is the national anthem — music by Calixa Lavallée; French lyrics by Sir Adolphe-Basile Routhier (1880); English lyrics adapted by Robert Stanley Weir (1908).\",\"Proclaimed as Canada\'s national anthem in 1980.\",\"\'God Save the Queen\' (or King) is the royal anthem.\"]},{\"heading\":\"Honours\",\"points\":[\"The Victoria Cross (V.C.) is the highest honour available to Canadians, for conspicuous bravery in the presence of the enemy.\",\"The Order of Canada, created in 1967, honours outstanding lifetime achievement.\",\"Other honours include the Order of Military Merit and the Star of Courage.\"]},{\"heading\":\"Remembrance and sports\",\"points\":[\"Remembrance Day — November 11 — honours those who served and died in wars up to the present day.\",\"The poppy is the symbol of remembrance.\",\"Hockey is Canada\'s national winter sport; lacrosse is the national summer sport (Hockey and Lacrosse Acts).\",\"Other Canadian-invented sports include basketball (Dr. James Naismith, 1891) and five-pin bowling.\"]}]}', NULL, 'active', '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(10, 1, 'Canada\'s Economy', 'economy', 'Pages 90-92', NULL, '{\"intro\":\"Canada\'s economy: industries, trade, and money.\",\"sections\":[{\"heading\":\"Three main types of industry\",\"points\":[\"Service industries — most Canadians work here (transportation, education, healthcare, construction, banking, communications, retail, tourism, government).\",\"Manufacturing industries — paper, high tech, aerospace, automobiles, food.\",\"Natural resources industries — forestry, fishing, agriculture, mining, energy. About 1 in 10 Canadians works in these industries.\"]},{\"heading\":\"Trade\",\"points\":[\"The United States is by far Canada\'s largest trading partner.\",\"Canada has trade agreements with countries around the world.\",\"Canada is a member of the G7, G20, OECD, the WTO, and the United Nations.\"]},{\"heading\":\"Money\",\"points\":[\"The Canadian dollar is Canada\'s currency.\",\"The Royal Canadian Mint produces Canadian circulation coins.\",\"The Bank of Canada is Canada\'s central bank.\"]}]}', NULL, 'active', '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(11, 1, 'Canada\'s Regions', 'regions', 'Pages 93-105', NULL, '{\"intro\":\"Canada\'s regions, provinces, territories, and their capitals.\",\"sections\":[{\"heading\":\"The country at a glance\",\"points\":[\"Canada has 10 provinces and 3 territories.\",\"Ottawa, in Ontario, is the capital of Canada — chosen in 1857 by Queen Victoria.\",\"Canada is the second-largest country in the world by area.\"]},{\"heading\":\"Atlantic Provinces\",\"points\":[\"Newfoundland and Labrador (capital: St. John\'s) — easternmost point of North America.\",\"Prince Edward Island (capital: Charlottetown) — smallest province; the \'Birthplace of Confederation\' (1864 conference).\",\"Nova Scotia (capital: Halifax) — most populous Atlantic province; major shipping centre.\",\"New Brunswick (capital: Fredericton) — Canada\'s only officially bilingual province.\"]},{\"heading\":\"Central Canada\",\"points\":[\"Quebec (capital: Quebec City; largest city: Montreal) — home to most French-speaking Canadians; civil-law tradition; Quebec City is the only walled city north of Mexico.\",\"Ontario (capital: Toronto) — most populous province; Toronto is Canada\'s largest city and financial centre; Niagara Falls is here.\"]},{\"heading\":\"Prairie Provinces\",\"points\":[\"Manitoba (capital: Winnipeg) — agriculture and Aboriginal heritage; Winnipeg is the historic hub of the Métis.\",\"Saskatchewan (capital: Regina) — large grain producer; home to the RCMP training academy.\",\"Alberta (capital: Edmonton) — largest oil and gas producer; Calgary is famous for the Calgary Stampede.\"]},{\"heading\":\"West Coast\",\"points\":[\"British Columbia (capital: Victoria; largest city: Vancouver) — Pacific gateway, forestry, mining, film, tourism.\",\"Port of Vancouver is Canada\'s largest and busiest port.\"]},{\"heading\":\"Northern Territories\",\"points\":[\"Yukon (capital: Whitehorse) — famous for the Klondike Gold Rush (1890s).\",\"Northwest Territories (capital: Yellowknife) — diamond mining; many Aboriginal peoples.\",\"Nunavut (capital: Iqaluit) — created in 1999; \'Nunavut\' means \'our land\' in Inuktitut.\",\"The territories together cover about one third of Canada\'s land mass.\"]}]}', NULL, 'active', '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(12, 1, 'Study Questions', 'study', 'Pages 106-110', NULL, '{\"intro\":\"The official sample test questions from the back of Discover Canada. Use these to test yourself before the real exam.\",\"sections\":[{\"heading\":\"Practising\",\"points\":[\"Every question on the citizenship test is based on Discover Canada.\",\"The test is 20 questions in 45 minutes (2026 format). You need 15 correct to pass.\",\"Up to 3 attempts before a hearing is scheduled.\",\"Use the mock exam in this app to simulate the timer and the experience.\"]}]}', NULL, 'active', '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(13, 1, 'New Chapter', 'new', 'New Chapter', NULL, '{\"intro\":\"Canada\'s regions, provinces, territories, and their capitals.\",\"sections\":[{\"heading\":\"The country at a glance\",\"points\":[\"Canada has 10 provinces and 3 territories.\",\"Ottawa, in Ontario, is the capital of Canada — chosen in 1857 by Queen Victoria.\",\"Canada is the second-largest country in the world by area.\"]},{\"heading\":\"Atlantic Provinces\",\"points\":[\"Newfoundland and Labrador (capital: St. John\'s) — easternmost point of North America.\",\"Prince Edward Island (capital: Charlottetown) — smallest province; the \'Birthplace of Confederation\' (1864 conference).\",\"Nova Scotia (capital: Halifax) — most populous Atlantic province; major shipping centre.\",\"New Brunswick (capital: Fredericton) — Canada\'s only officially bilingual province.\"]},{\"heading\":\"Central Canada\",\"points\":[\"Quebec (capital: Quebec City; largest city: Montreal) — home to most French-speaking Canadians; civil-law tradition; Quebec City is the only walled city north of Mexico.\",\"Ontario (capital: Toronto) — most populous province; Toronto is Canada\'s largest city and financial centre; Niagara Falls is here.\"]},{\"heading\":\"Prairie Provinces\",\"points\":[\"Manitoba (capital: Winnipeg) — agriculture and Aboriginal heritage; Winnipeg is the historic hub of the Métis.\",\"Saskatchewan (capital: Regina) — large grain producer; home to the RCMP training academy.\",\"Alberta (capital: Edmonton) — largest oil and gas producer; Calgary is famous for the Calgary Stampede.\"]},{\"heading\":\"West Coast\",\"points\":[\"British Columbia (capital: Victoria; largest city: Vancouver) — Pacific gateway, forestry, mining, film, tourism.\",\"Port of Vancouver is Canada\'s largest and busiest port.\"]},{\"heading\":\"Northern Territories\",\"points\":[\"Yukon (capital: Whitehorse) — famous for the Klondike Gold Rush (1890s).\",\"Northwest Territories (capital: Yellowknife) — diamond mining; many Aboriginal peoples.\",\"Nunavut (capital: Iqaluit) — created in 1999; \'Nunavut\' means \'our land\' in Inuktitut.\",\"The territories together cover about one third of Canada\'s land mass.\"]}]}', NULL, 'active', '2026-06-04 12:56:46', '2026-06-04 12:57:06');

-- --------------------------------------------------------

--
-- Table structure for table `contact_messages`
--

CREATE TABLE `contact_messages` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `phone` varchar(50) DEFAULT NULL,
  `subject` varchar(255) DEFAULT NULL,
  `message` text NOT NULL,
  `status` enum('new','read','replied') NOT NULL DEFAULT 'new',
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `contact_messages`
--

INSERT INTO `contact_messages` (`id`, `name`, `email`, `phone`, `subject`, `message`, `status`, `created_at`, `updated_at`) VALUES
(1, 'Abdur Rahman', 'majid.bd905@gmail.com', '+8801744676725', 'adsfd', 'asdfasdfds', 'new', '2026-06-04 17:55:24', '2026-06-04 17:55:24');

-- --------------------------------------------------------

--
-- Table structure for table `faqs`
--

CREATE TABLE `faqs` (
  `id` int(11) NOT NULL,
  `question` text NOT NULL,
  `answer` text NOT NULL,
  `status` enum('active','inactive') NOT NULL DEFAULT 'active',
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `faqs`
--

INSERT INTO `faqs` (`id`, `question`, `answer`, `status`, `created_at`, `updated_at`) VALUES
(1, 'How do I use Passpilot?', 'Start with onboarding, choose your province and language, then study chapters, practice questions, and take the mock exam.', 'active', '2026-06-03 09:56:19', '2026-06-03 09:56:19'),
(2, 'Can I change my theme?', 'Yes. Open Settings and switch between light, dark, or system theme mode.', 'active', '2026-06-03 09:56:19', '2026-06-03 09:56:19'),
(3, 'Is my progress stored?', 'Your progress is saved to the MySQL database when you connect through the backend API.', 'active', '2026-06-03 09:56:19', '2026-06-03 09:56:19'),
(5, 'new faq question', 'new faq ans.', 'inactive', '2026-06-04 18:04:59', '2026-06-04 18:05:16');

-- --------------------------------------------------------

--
-- Table structure for table `languages`
--

CREATE TABLE `languages` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `code` varchar(16) NOT NULL,
  `status` enum('active','inactive') NOT NULL DEFAULT 'active',
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `languages`
--

INSERT INTO `languages` (`id`, `name`, `code`, `status`, `created_at`, `updated_at`) VALUES
(1, 'English', 'en', 'active', '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(2, 'French', 'fr', 'active', '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(3, 'Punjabi', 'pa', 'active', '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(4, 'Tagalog', 'tl', 'active', '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(5, 'Chinese', 'zh', 'active', '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(6, 'Hindi', 'hi', 'active', '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(7, 'Arabic', 'ar', 'active', '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(8, 'Spanish', 'es', 'active', '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(9, 'Bangla', 'bn', 'active', '2026-06-03 16:43:55', '2026-06-03 16:43:55');

-- --------------------------------------------------------

--
-- Table structure for table `mock_tests`
--

CREATE TABLE `mock_tests` (
  `id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `time_limit` int(11) NOT NULL DEFAULT 45,
  `total_marks` int(11) NOT NULL DEFAULT 20,
  `pass_marks` int(11) NOT NULL DEFAULT 15,
  `status` enum('active','inactive') NOT NULL DEFAULT 'active',
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `total_questions` int(11) NOT NULL DEFAULT 20,
  `question_selection_mode` enum('random','manual') NOT NULL DEFAULT 'manual'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `mock_tests`
--

INSERT INTO `mock_tests` (`id`, `title`, `description`, `time_limit`, `total_marks`, `pass_marks`, `status`, `created_at`, `updated_at`, `total_questions`, `question_selection_mode`) VALUES
(1, 'Canadian Citizenship Mock Exam', 'A full simulation of the official IRCC online citizenship test with 20 balanced questions.', 20, 20, 15, 'active', '2026-06-03 09:56:19', '2026-06-03 17:23:53', 20, 'manual'),
(2, 'Test Mock', 'A full simulation of the official CANADA online citizenship test with 20 balanced questions.', 10, 10, 5, 'active', '2026-06-03 17:26:54', '2026-06-03 17:26:54', 20, 'manual'),
(7, 'New Mock Test', 'New Mock Test', 20, 20, 20, 'active', '2026-06-04 17:13:46', '2026-06-04 17:13:46', 20, 'manual'),
(8, 'dgsdg', 'dfgdfg', 50, 50, 40, 'active', '2026-06-04 17:23:41', '2026-06-04 17:23:41', 25, 'random');

-- --------------------------------------------------------

--
-- Table structure for table `mock_test_questions`
--

CREATE TABLE `mock_test_questions` (
  `id` int(11) NOT NULL,
  `mock_test_id` int(11) NOT NULL,
  `question_id` int(11) NOT NULL,
  `mark` int(11) NOT NULL DEFAULT 1,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `mock_test_questions`
--

INSERT INTO `mock_test_questions` (`id`, `mock_test_id`, `question_id`, `mark`, `created_at`, `updated_at`) VALUES
(1, 1, 97, 1, '2026-06-03 09:56:19', '2026-06-03 09:56:19'),
(2, 1, 68, 1, '2026-06-03 09:56:19', '2026-06-03 09:56:19'),
(3, 1, 43, 1, '2026-06-03 09:56:19', '2026-06-03 09:56:19'),
(4, 1, 105, 1, '2026-06-03 09:56:19', '2026-06-03 09:56:19'),
(5, 1, 82, 1, '2026-06-03 09:56:19', '2026-06-03 09:56:19'),
(6, 1, 48, 1, '2026-06-03 09:56:19', '2026-06-03 09:56:19'),
(7, 1, 37, 1, '2026-06-03 09:56:19', '2026-06-03 09:56:19'),
(8, 1, 145, 1, '2026-06-03 09:56:19', '2026-06-03 09:56:19'),
(9, 1, 129, 1, '2026-06-03 09:56:19', '2026-06-03 09:56:19'),
(10, 1, 34, 1, '2026-06-03 09:56:19', '2026-06-03 09:56:19'),
(11, 1, 60, 1, '2026-06-03 09:56:19', '2026-06-03 09:56:19'),
(12, 1, 8, 1, '2026-06-03 09:56:19', '2026-06-03 09:56:19'),
(13, 1, 62, 1, '2026-06-03 09:56:19', '2026-06-03 09:56:19'),
(14, 1, 4, 1, '2026-06-03 09:56:19', '2026-06-03 09:56:19'),
(15, 1, 5, 1, '2026-06-03 09:56:19', '2026-06-03 09:56:19'),
(16, 1, 93, 1, '2026-06-03 09:56:19', '2026-06-03 09:56:19'),
(17, 1, 45, 1, '2026-06-03 09:56:19', '2026-06-03 09:56:19'),
(18, 1, 15, 1, '2026-06-03 09:56:19', '2026-06-03 09:56:19'),
(19, 1, 109, 1, '2026-06-03 09:56:19', '2026-06-03 09:56:19'),
(20, 1, 28, 1, '2026-06-03 09:56:19', '2026-06-03 09:56:19'),
(108, 7, 22, 1, '2026-06-04 17:13:46', '2026-06-04 17:13:46'),
(109, 7, 126, 1, '2026-06-04 17:13:46', '2026-06-04 17:13:46'),
(110, 7, 33, 1, '2026-06-04 17:13:46', '2026-06-04 17:13:46'),
(111, 7, 19, 1, '2026-06-04 17:13:46', '2026-06-04 17:13:46'),
(112, 7, 118, 1, '2026-06-04 17:13:46', '2026-06-04 17:13:46'),
(113, 7, 132, 1, '2026-06-04 17:13:46', '2026-06-04 17:13:46'),
(114, 7, 2, 1, '2026-06-04 17:13:46', '2026-06-04 17:13:46'),
(115, 7, 121, 1, '2026-06-04 17:13:46', '2026-06-04 17:13:46'),
(116, 7, 144, 1, '2026-06-04 17:13:46', '2026-06-04 17:13:46'),
(117, 7, 20, 1, '2026-06-04 17:13:46', '2026-06-04 17:13:46'),
(118, 7, 89, 1, '2026-06-04 17:13:46', '2026-06-04 17:13:46'),
(119, 7, 73, 1, '2026-06-04 17:13:46', '2026-06-04 17:13:46'),
(120, 7, 56, 1, '2026-06-04 17:13:46', '2026-06-04 17:13:46'),
(121, 7, 97, 1, '2026-06-04 17:13:46', '2026-06-04 17:13:46'),
(122, 7, 10, 1, '2026-06-04 17:13:46', '2026-06-04 17:13:46'),
(123, 7, 65, 1, '2026-06-04 17:13:46', '2026-06-04 17:13:46'),
(124, 7, 142, 1, '2026-06-04 17:13:46', '2026-06-04 17:13:46'),
(125, 7, 110, 1, '2026-06-04 17:13:46', '2026-06-04 17:13:46'),
(126, 7, 39, 1, '2026-06-04 17:13:46', '2026-06-04 17:13:46'),
(127, 7, 54, 1, '2026-06-04 17:13:46', '2026-06-04 17:13:46'),
(128, 8, 100, 1, '2026-06-04 17:23:41', '2026-06-04 17:23:41'),
(129, 8, 40, 1, '2026-06-04 17:23:41', '2026-06-04 17:23:41'),
(130, 8, 37, 1, '2026-06-04 17:23:41', '2026-06-04 17:23:41'),
(131, 8, 19, 1, '2026-06-04 17:23:41', '2026-06-04 17:23:41'),
(132, 8, 89, 1, '2026-06-04 17:23:41', '2026-06-04 17:23:41'),
(133, 8, 69, 1, '2026-06-04 17:23:41', '2026-06-04 17:23:41'),
(134, 8, 77, 1, '2026-06-04 17:23:41', '2026-06-04 17:23:41'),
(135, 8, 51, 1, '2026-06-04 17:23:41', '2026-06-04 17:23:41'),
(136, 8, 107, 1, '2026-06-04 17:23:41', '2026-06-04 17:23:41'),
(137, 8, 115, 1, '2026-06-04 17:23:41', '2026-06-04 17:23:41'),
(138, 8, 23, 1, '2026-06-04 17:23:41', '2026-06-04 17:23:41'),
(139, 8, 20, 1, '2026-06-04 17:23:41', '2026-06-04 17:23:41'),
(140, 8, 39, 1, '2026-06-04 17:23:41', '2026-06-04 17:23:41'),
(141, 8, 60, 1, '2026-06-04 17:23:41', '2026-06-04 17:23:41'),
(142, 8, 145, 1, '2026-06-04 17:23:41', '2026-06-04 17:23:41'),
(143, 8, 56, 1, '2026-06-04 17:23:41', '2026-06-04 17:23:41'),
(144, 8, 46, 1, '2026-06-04 17:23:41', '2026-06-04 17:23:41'),
(145, 8, 25, 1, '2026-06-04 17:23:41', '2026-06-04 17:23:41'),
(146, 8, 63, 1, '2026-06-04 17:23:41', '2026-06-04 17:23:41'),
(147, 8, 3, 1, '2026-06-04 17:23:41', '2026-06-04 17:23:41'),
(148, 8, 16, 1, '2026-06-04 17:23:41', '2026-06-04 17:23:41'),
(149, 8, 4, 1, '2026-06-04 17:23:41', '2026-06-04 17:23:41'),
(150, 8, 121, 1, '2026-06-04 17:23:41', '2026-06-04 17:23:41'),
(151, 8, 144, 1, '2026-06-04 17:23:41', '2026-06-04 17:23:41'),
(152, 8, 12, 1, '2026-06-04 17:23:41', '2026-06-04 17:23:41');

-- --------------------------------------------------------

--
-- Table structure for table `notifications`
--

CREATE TABLE `notifications` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `message` text NOT NULL,
  `is_read` tinyint(1) NOT NULL DEFAULT 0,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `notifications`
--

INSERT INTO `notifications` (`id`, `user_id`, `title`, `message`, `is_read`, `created_at`, `updated_at`) VALUES
(3, 13, 'check', 'checking notification read', 1, '2026-06-03 17:16:50', '2026-06-03 17:17:16'),
(4, 11, 'test', 'testing', 1, '2026-06-03 18:47:19', '2026-06-03 18:47:27'),
(5, 16, 'dfdsf', 'adsfdsfdsafdsf', 1, '2026-06-04 21:54:25', '2026-06-04 21:54:34');

-- --------------------------------------------------------

--
-- Table structure for table `payments`
--

CREATE TABLE `payments` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `subscription_id` int(11) DEFAULT NULL,
  `amount` decimal(10,2) NOT NULL DEFAULT 0.00,
  `currency` varchar(10) NOT NULL DEFAULT 'CAD',
  `payment_method` varchar(255) DEFAULT NULL,
  `transaction_id` varchar(255) DEFAULT NULL,
  `gateway_response` text DEFAULT NULL,
  `status` enum('pending','paid','failed','refunded') NOT NULL DEFAULT 'pending',
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `practice_questions`
--

CREATE TABLE `practice_questions` (
  `id` int(11) NOT NULL,
  `source_question_id` int(11) DEFAULT NULL,
  `chapter_id` int(11) NOT NULL,
  `question` text NOT NULL,
  `question_image` varchar(500) DEFAULT NULL,
  `question_type` enum('mcq','true_false') NOT NULL DEFAULT 'mcq',
  `correct_answer` varchar(255) DEFAULT NULL,
  `explanation` text DEFAULT NULL,
  `difficulty` enum('easy','medium','hard') NOT NULL DEFAULT 'easy',
  `status` enum('active','inactive') NOT NULL DEFAULT 'active',
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `practice_questions`
--

INSERT INTO `practice_questions` (`id`, `source_question_id`, `chapter_id`, `question`, `question_image`, `question_type`, `correct_answer`, `explanation`, `difficulty`, `status`, `created_at`, `updated_at`) VALUES
(2, 2, 2, 'Name two key documents that contain our rights and freedoms.', NULL, 'mcq', '1', 'Canadian rights are rooted in the Magna Carta (1215), English common law, and the French civil code, and are codified in the Canadian Charter of Rights and Freedoms (1982) and the Canadian Human Rights Act.', 'easy', 'active', '2026-06-04 17:16:44', '2026-06-04 17:16:44'),
(3, 3, 2, 'Which of the following is NOT a fundamental freedom guaranteed by the Canadian Charter?', NULL, 'mcq', '3', 'The Charter guarantees freedom of conscience and religion; thought, belief, opinion and expression including the press; peaceful assembly; and association.', 'easy', 'active', '2026-06-04 17:16:44', '2026-06-04 17:16:44'),
(4, 4, 2, 'What is meant by the equality of women and men in Canada?', NULL, 'mcq', '2', 'In Canada, men and women are equal under the law. Canada\'s openness and generosity do not extend to barbaric cultural practices that tolerate spousal abuse, \'honour killings,\' female genital mutilation, forced marriage or other gender-based violence.', 'easy', 'active', '2026-06-04 17:16:44', '2026-06-04 17:16:44'),
(5, 5, 2, 'Which right gives Canadians the freedom to live and work anywhere in Canada?', NULL, 'mcq', '2', 'Mobility rights mean Canadians can live and work anywhere they choose in Canada, enter and leave the country freely, and apply for a passport.', 'medium', 'active', '2026-06-04 17:16:44', '2026-06-04 17:16:44'),
(6, 6, 2, 'Which of the following is a responsibility of Canadian citizenship?', NULL, 'mcq', '1', 'Serving on a jury when called is a responsibility of citizenship. It is a privilege that makes the justice system work and depends on impartial juries of citizens.', 'easy', 'active', '2026-06-04 17:16:44', '2026-06-04 17:16:44'),
(7, 7, 2, 'What is habeas corpus?', NULL, 'mcq', '1', 'Habeas corpus, the right to challenge unlawful detention by the state, comes from English common law and is one of Canada\'s most important legal rights.', 'medium', 'active', '2026-06-04 17:16:44', '2026-06-04 17:16:44'),
(8, 8, 2, 'Which is an example of taking responsibility for yourself and your family?', NULL, 'mcq', '0', 'Getting a job, taking care of one\'s family and working hard in keeping with one\'s abilities are important Canadian values. Hard work in turn brings personal dignity and self-respect.', 'easy', 'active', '2026-06-04 17:16:44', '2026-06-04 17:16:44'),
(9, 9, 3, 'Who were the founding peoples of Canada?', NULL, 'mcq', '1', 'Aboriginal, French and British peoples are the founding peoples of Canada.', 'easy', 'active', '2026-06-04 17:16:44', '2026-06-04 17:16:44'),
(10, 10, 3, 'Who are the Métis?', NULL, 'mcq', '1', 'The Métis are a distinct people of mixed Aboriginal and European ancestry, the majority of whom live on the Prairies. They speak their own dialect, Michif.', 'easy', 'active', '2026-06-04 17:16:44', '2026-06-04 17:16:44'),
(11, 11, 3, 'What does the word \'Inuit\' mean?', NULL, 'mcq', '0', 'Inuit, meaning \'the people\' in the Inuktitut language, live in small, scattered communities across the Arctic.', 'easy', 'active', '2026-06-04 17:16:44', '2026-06-04 17:16:44'),
(12, 12, 3, 'What three groups make up the Aboriginal peoples of Canada?', NULL, 'mcq', '0', 'The Aboriginal peoples include First Nations (Indians), Métis and Inuit.', 'medium', 'active', '2026-06-04 17:16:44', '2026-06-04 17:16:44'),
(13, 13, 3, 'What are Canada\'s two official languages?', NULL, 'mcq', '1', 'English and French are the two official languages of Canada and are important symbols of identity.', 'easy', 'active', '2026-06-04 17:16:44', '2026-06-04 17:16:44'),
(14, 14, 3, 'Where do most French-speaking Canadians live?', NULL, 'mcq', '1', 'The province of Quebec is home to the majority of Canada\'s French-speaking population. There are also one million Francophones outside Quebec, including Acadians.', 'medium', 'active', '2026-06-04 17:16:44', '2026-06-04 17:16:44'),
(15, 15, 3, 'Who are the Acadians?', NULL, 'mcq', '1', 'Acadians are the descendants of French colonists who began settling in what are now the Maritime provinces in 1604.', 'medium', 'active', '2026-06-04 17:16:44', '2026-06-04 17:16:44'),
(16, 16, 3, 'What is an Anglophone?', NULL, 'mcq', '0', 'Anglophones are people whose first language is English. Francophones are people whose first language is French.', 'easy', 'active', '2026-06-04 17:16:44', '2026-06-04 17:16:44'),
(17, 17, 3, 'What is the term used to describe Canadians whose first language learned is neither English nor French?', NULL, 'mcq', '1', 'An Allophone is a resident whose first language learned is neither English nor French.', 'easy', 'active', '2026-06-04 17:16:44', '2026-06-04 17:16:44'),
(18, 18, 4, 'What does Confederation mean?', NULL, 'mcq', '0', 'Confederation refers to the union of the British North American colonies of Nova Scotia, New Brunswick, and the Province of Canada into the Dominion of Canada on July 1, 1867.', 'easy', 'active', '2026-06-04 17:16:44', '2026-06-04 17:16:44'),
(19, 19, 4, 'In what year did Canada become a country (Confederation)?', NULL, 'mcq', '1', 'On July 1, 1867, the British North America Act came into effect, creating the Dominion of Canada. July 1 is celebrated as Canada Day.', 'easy', 'active', '2026-06-04 17:16:44', '2026-06-04 17:16:44'),
(20, 20, 4, 'Who was Canada\'s first Prime Minister?', NULL, 'mcq', '1', 'Sir John Alexander Macdonald, born in Scotland, became Canada\'s first Prime Minister. His portrait is on the $10 bill, and his birthday (January 11) is Sir John A. Macdonald Day.', 'easy', 'active', '2026-06-04 17:16:44', '2026-06-04 17:16:44'),
(21, 21, 4, 'What is meant by \'responsible government\'?', NULL, 'mcq', '1', 'Responsible government means that the ministers of the Crown must have the support of a majority of the elected representatives in order to govern.', 'medium', 'active', '2026-06-04 17:16:44', '2026-06-04 17:16:44'),
(22, 22, 4, 'Who was Sir Louis-Hippolyte La Fontaine?', NULL, 'mcq', '1', 'Sir Louis-Hippolyte La Fontaine, a champion of democracy and French language rights, became the first head of a responsible government in the Canadas in 1849.', 'hard', 'active', '2026-06-04 17:16:44', '2026-06-04 17:16:44'),
(23, 23, 4, 'What did the Canadian Pacific Railway symbolize?', NULL, 'mcq', '1', 'The Canadian Pacific Railway, completed in 1885, symbolized national unity, joining Canada from the Atlantic to the Pacific.', 'medium', 'active', '2026-06-04 17:16:44', '2026-06-04 17:16:44'),
(24, 24, 4, 'What is the significance of the discovery of insulin by Sir Frederick Banting and Charles Best?', NULL, 'mcq', '1', 'In 1922, Sir Frederick Banting and Charles Best discovered insulin, a hormone to treat diabetes, which until then was a fatal disease — saving millions of lives worldwide.', 'medium', 'active', '2026-06-04 17:16:44', '2026-06-04 17:16:44'),
(25, 25, 4, 'Who led the defence against the United States in the War of 1812?', NULL, 'mcq', '1', 'Major-General Sir Isaac Brock and his Indigenous ally Chief Tecumseh led the successful defence against the American invasion in the War of 1812.', 'medium', 'active', '2026-06-04 17:16:44', '2026-06-04 17:16:44'),
(26, 26, 4, 'What significant World War I battle is considered a defining moment for Canada?', NULL, 'mcq', '1', 'On April 9, 1917, all four Canadian Corps divisions stormed Vimy Ridge in France, capturing it from the Germans. April 9 is celebrated as Vimy Day.', 'medium', 'active', '2026-06-04 17:16:44', '2026-06-04 17:16:44'),
(27, 27, 4, 'What was Canada\'s contribution in World War II?', NULL, 'mcq', '1', 'More than one million Canadians and Newfoundlanders served in World War II. Canadian soldiers liberated the Netherlands and landed at Juno Beach on D-Day, June 6, 1944.', 'medium', 'active', '2026-06-04 17:16:44', '2026-06-04 17:16:44'),
(28, 28, 4, 'Who claimed the land that is now Canada for King Francis I of France in 1534?', NULL, 'mcq', '1', 'Jacques Cartier made three voyages across the Atlantic, claiming the land for King Francis I of France. He heard two Indigenous guides use the Iroquoian word \'kanata,\' meaning \'village\' — and Canada got its name.', 'medium', 'active', '2026-06-04 17:16:44', '2026-06-04 17:16:44'),
(29, 29, 4, 'Who founded Quebec City in 1608 and is known as the \'Father of New France\'?', NULL, 'mcq', '1', 'Samuel de Champlain built a fortress at Quebec City in 1608 and is known as the \'Father of New France.\'', 'medium', 'active', '2026-06-04 17:16:44', '2026-06-04 17:16:44'),
(30, 30, 5, 'Which province first gave women the right to vote in 1916?', NULL, 'mcq', '2', 'In 1916, Manitoba became the first province to grant voting rights to women. By 1918, most Canadian female citizens 21 and over could vote in federal elections.', 'medium', 'active', '2026-06-04 17:16:44', '2026-06-04 17:16:44'),
(31, 31, 5, 'When was the Canadian Charter of Rights and Freedoms adopted?', NULL, 'mcq', '2', 'In 1982, the Canadian Charter of Rights and Freedoms was added to the Constitution Act, 1982, by Prime Minister Pierre Elliott Trudeau.', 'easy', 'active', '2026-06-04 17:16:44', '2026-06-04 17:16:44'),
(32, 32, 5, 'When was the current Canadian flag (Maple Leaf Flag) raised for the first time?', NULL, 'mcq', '1', 'The red and white Maple Leaf flag was raised for the first time in 1965 under Prime Minister Lester B. Pearson.', 'medium', 'active', '2026-06-04 17:16:44', '2026-06-04 17:16:44'),
(33, 33, 5, 'Who helped develop universal medicare in Canada?', NULL, 'mcq', '1', 'Tommy Douglas, a Baptist minister and Saskatchewan premier, helped establish in 1962 the first government-controlled, universal, comprehensive single-payer medical insurance plan in Canada.', 'medium', 'active', '2026-06-04 17:16:44', '2026-06-04 17:16:44'),
(34, 34, 5, 'Who introduced the Canadian Bill of Rights in 1960?', NULL, 'mcq', '0', 'Prime Minister John Diefenbaker introduced the Canadian Bill of Rights in 1960. Today this is part of the Canadian Charter of Rights and Freedoms.', 'medium', 'active', '2026-06-04 17:16:44', '2026-06-04 17:16:44'),
(35, 35, 6, 'What does it mean to say that Canada is a constitutional monarchy?', NULL, 'mcq', '1', 'In Canada\'s constitutional monarchy, the Sovereign is the head of state and reigns in accordance with the Constitution and the rule of law.', 'easy', 'active', '2026-06-04 17:16:44', '2026-06-04 17:16:44'),
(36, 36, 6, 'What are the three branches of government in Canada?', NULL, 'mcq', '1', 'The three branches of government are executive (which puts laws into effect), legislative (which makes laws), and judicial (which decides cases according to the laws).', 'easy', 'active', '2026-06-04 17:16:44', '2026-06-04 17:16:44'),
(37, 37, 6, 'What is the difference between the role of the Queen and that of the Prime Minister?', NULL, 'mcq', '1', 'The Sovereign is Canada\'s head of state — a symbol of Canadian sovereignty and a guardian of constitutional freedoms. The Prime Minister is the head of government and selects the Cabinet ministers.', 'medium', 'active', '2026-06-04 17:16:44', '2026-06-04 17:16:44'),
(38, 38, 6, 'What are the three levels of government in Canada?', NULL, 'mcq', '0', 'The three levels of government in Canada are federal (national), provincial/territorial, and municipal (city/local).', 'easy', 'active', '2026-06-04 17:16:44', '2026-06-04 17:16:44'),
(39, 39, 6, 'What are the three parts of Parliament?', NULL, 'mcq', '1', 'Parliament has three parts: the Sovereign (Queen or King), the Senate, and the House of Commons. Provincial legislatures comprise the Lieutenant Governor and the elected Assembly.', 'easy', 'active', '2026-06-04 17:16:44', '2026-06-04 17:16:44'),
(40, 40, 6, 'How are senators chosen in Canada?', NULL, 'mcq', '1', 'Senators are appointed by the Governor General on the advice of the Prime Minister and serve until age 75.', 'medium', 'active', '2026-06-04 17:16:44', '2026-06-04 17:16:44'),
(41, 41, 7, 'How are members of Parliament chosen?', NULL, 'mcq', '2', 'Members of Parliament (MPs) are elected by voters in each electoral district (also called constituencies or ridings).', 'easy', 'active', '2026-06-04 17:16:44', '2026-06-04 17:16:44'),
(42, 42, 7, 'Who is entitled to vote in Canadian federal elections?', NULL, 'mcq', '1', 'To vote in a federal election, a person must be a Canadian citizen, at least 18 years old on voting day, and on the voters\' list.', 'easy', 'active', '2026-06-04 17:16:44', '2026-06-04 17:16:44'),
(43, 43, 7, 'In Canada, are you obliged to tell other people how you voted?', NULL, 'mcq', '2', 'No. The ballot is secret. Canadians enjoy a secret ballot — a fundamental democratic right.', 'easy', 'active', '2026-06-04 17:16:44', '2026-06-04 17:16:44'),
(44, 44, 7, 'After a federal election, which party forms the government?', NULL, 'mcq', '1', 'The political party with the most elected representatives (MPs) usually forms the government. Its leader becomes the Prime Minister.', 'easy', 'active', '2026-06-04 17:16:44', '2026-06-04 17:16:44'),
(45, 45, 7, 'When you go to vote on election day, what do you do?', NULL, 'mcq', '1', 'You go to the polling station, prove your identity and address, then go behind the voting screen to mark an X on the ballot next to the name of the candidate of your choice.', 'easy', 'active', '2026-06-04 17:16:45', '2026-06-04 17:16:45'),
(46, 46, 7, 'What is a majority government?', NULL, 'mcq', '0', 'If the party in power holds at least half the seats in the House of Commons, it is called a majority government. If it holds less than half, it is called a minority government.', 'medium', 'active', '2026-06-04 17:16:45', '2026-06-04 17:16:45'),
(47, 47, 8, 'What is the role of the courts in Canada?', NULL, 'mcq', '1', 'The courts in Canada settle disputes between people, and between people and the government. They decide whether someone has broken a law.', 'easy', 'active', '2026-06-04 17:16:45', '2026-06-04 17:16:45'),
(48, 48, 8, 'In Canada, are you allowed to question the police about their service or conduct?', NULL, 'mcq', '1', 'Yes. The police are there to keep people safe and enforce the law. You can question them about their service or conduct if you need to.', 'easy', 'active', '2026-06-04 17:16:45', '2026-06-04 17:16:45'),
(49, 49, 8, 'What is the highest court in Canada?', NULL, 'mcq', '1', 'The Supreme Court of Canada is the highest court in the country, the final court of appeal.', 'medium', 'active', '2026-06-04 17:16:45', '2026-06-04 17:16:45'),
(50, 50, 8, 'What is the rule of law?', NULL, 'mcq', '1', 'The rule of law means that the law applies equally to everyone, including the police, governments and public officials. No one is above the law.', 'easy', 'active', '2026-06-04 17:16:45', '2026-06-04 17:16:45'),
(51, 51, 8, 'In Canada\'s justice system, who is presumed innocent until proven guilty?', NULL, 'mcq', '0', 'Everyone charged with an offence is presumed innocent until proven guilty in a fair trial.', 'easy', 'active', '2026-06-04 17:16:45', '2026-06-04 17:16:45'),
(52, 52, 9, 'What is the meaning of the Remembrance Day poppy?', NULL, 'mcq', '3', 'The poppy is a symbol of remembrance, worn each November to honour the sacrifice of Canadians who have served or died in wars up to the present day.', 'easy', 'active', '2026-06-04 17:16:45', '2026-06-04 17:16:45'),
(53, 53, 9, 'What is the highest honour that Canadians can receive?', NULL, 'mcq', '1', 'The Victoria Cross (V.C.) is the highest honour available to Canadians. It is awarded for the most conspicuous bravery, daring or pre-eminent act of valour, self-sacrifice or extreme devotion to duty in the presence of the enemy.', 'easy', 'active', '2026-06-04 17:16:45', '2026-06-04 17:16:45'),
(54, 54, 9, 'What is the national anthem of Canada?', NULL, 'mcq', '1', '\'O Canada\' was proclaimed as Canada\'s national anthem in 1980. It was first sung in Quebec City in 1880.', 'easy', 'active', '2026-06-04 17:16:45', '2026-06-04 17:16:45'),
(55, 55, 9, 'What is the royal anthem of Canada?', NULL, 'mcq', '1', 'The royal anthem of Canada is \'God Save the Queen\' (or King). It can be played or sung on any occasion when Canadians wish to honour the Sovereign.', 'medium', 'active', '2026-06-04 17:16:45', '2026-06-04 17:16:45'),
(56, 56, 9, 'Which of the following are Canadian symbols?', NULL, 'mcq', '1', 'Canadian symbols include the Maple Leaf flag, the beaver, the Canadian Coat of Arms, the maple tree, the fleur-de-lys, the Crown, and Parliament Buildings.', 'easy', 'active', '2026-06-04 17:16:45', '2026-06-04 17:16:45'),
(57, 57, 9, 'Why is the beaver a Canadian symbol?', NULL, 'mcq', '1', 'The beaver was adopted as a symbol of the Hudson\'s Bay Company because of the fur trade. It appears on the Canadian five-cent coin.', 'medium', 'active', '2026-06-04 17:16:45', '2026-06-04 17:16:45'),
(58, 58, 10, 'What are Canada\'s three main types of industries?', NULL, 'mcq', '1', 'Canada\'s economy includes three main types of industries: service industries (which provide thousands of different jobs), manufacturing industries, and natural resources industries (forestry, fishing, agriculture, mining and energy).', 'medium', 'active', '2026-06-04 17:16:45', '2026-06-04 17:16:45'),
(59, 59, 10, 'What is Canada\'s largest trading partner?', NULL, 'mcq', '1', 'The United States is by far Canada\'s largest trading partner.', 'easy', 'active', '2026-06-04 17:16:45', '2026-06-04 17:16:45'),
(60, 60, 10, 'What is Canada\'s currency?', NULL, 'mcq', '1', 'The Canadian dollar is Canada\'s currency. The Royal Canadian Mint produces Canadian circulation coins.', 'easy', 'active', '2026-06-04 17:16:45', '2026-06-04 17:16:45'),
(61, 61, 11, 'What provinces are referred to as the Atlantic Provinces?', NULL, 'mcq', '1', 'The Atlantic Provinces are Newfoundland and Labrador, Prince Edward Island, Nova Scotia, and New Brunswick.', 'easy', 'active', '2026-06-04 17:16:45', '2026-06-04 17:16:45'),
(62, 62, 11, 'What are the Prairie Provinces?', NULL, 'mcq', '1', 'The Prairie Provinces are Manitoba, Saskatchewan and Alberta — rich in energy resources and some of the most fertile farmland in the world.', 'easy', 'active', '2026-06-04 17:16:45', '2026-06-04 17:16:45'),
(63, 63, 11, 'Which provinces are referred to as Central Canada?', NULL, 'mcq', '1', 'Quebec and Ontario are referred to as Central Canada. They are home to more than half of the Canadian population.', 'easy', 'active', '2026-06-04 17:16:45', '2026-06-04 17:16:45'),
(64, 64, 11, 'What are Canada\'s three northern territories?', NULL, 'mcq', '0', 'Canada\'s three territories — Yukon, Northwest Territories and Nunavut — cover one-third of Canada\'s land mass.', 'easy', 'active', '2026-06-04 17:16:45', '2026-06-04 17:16:45'),
(65, 65, 11, 'What is the capital city of Canada?', NULL, 'mcq', '2', 'Ottawa, located in Ontario on the Ottawa River, was chosen as the capital in 1857 by Queen Victoria.', 'easy', 'active', '2026-06-04 17:16:45', '2026-06-04 17:16:45'),
(66, 66, 11, 'What is the capital of British Columbia?', NULL, 'mcq', '1', 'Victoria is the capital of British Columbia. The largest city is Vancouver.', 'medium', 'active', '2026-06-04 17:16:45', '2026-06-04 17:16:45'),
(67, 67, 11, 'How many provinces and territories make up Canada?', NULL, 'mcq', '0', 'Canada has ten provinces and three territories.', 'easy', 'active', '2026-06-04 17:16:45', '2026-06-04 17:16:45'),
(68, 68, 11, 'When did Nunavut become a separate territory?', NULL, 'mcq', '2', 'Nunavut, meaning \'our land\' in Inuktitut, was established in 1999 as the third territory.', 'medium', 'active', '2026-06-04 17:16:45', '2026-06-04 17:16:45'),
(69, 69, 1, 'How is the citizenship test usually given?', NULL, 'mcq', '1', 'The citizenship test is usually a written test, but it could be an interview. You will be tested on knowledge of Canada and adequate knowledge of English or French.', 'easy', 'active', '2026-06-04 17:16:45', '2026-06-04 17:16:45'),
(70, 70, 1, 'At what age are adult applicants no longer required to write the citizenship test?', NULL, 'mcq', '2', 'Adult applicants 55 years of age and over do not need to write the citizenship test.', 'medium', 'active', '2026-06-04 17:16:45', '2026-06-04 17:16:45'),
(71, 71, 1, 'What happens at the citizenship ceremony?', NULL, 'mcq', '1', 'At the ceremony you take the Oath of Citizenship, sign the oath form, and receive your Canadian Citizenship Certificate.', 'easy', 'active', '2026-06-04 17:16:45', '2026-06-04 17:16:45'),
(72, 72, 1, 'What is the pass mark on the Canadian citizenship test?', NULL, 'mcq', '2', 'The pass mark is 15 out of 20 (75%). Adults aged 18–54 must pass.', 'easy', 'active', '2026-06-04 17:16:45', '2026-06-04 17:16:45'),
(73, 73, 1, 'What is one of the two basic requirements that the citizenship test assesses?', NULL, 'mcq', '0', 'The test assesses (1) knowledge of Canada and the rights and responsibilities of citizenship, and (2) adequate knowledge of English or French.', 'easy', 'active', '2026-06-04 17:16:45', '2026-06-04 17:16:45'),
(74, 74, 2, 'Which historical document is often called \'the Great Charter of Freedoms\' and is a key source of Canadian rights?', NULL, 'mcq', '1', 'Magna Carta, signed in England in 1215, is a foundational source of the rights and freedoms enjoyed by Canadians today.', 'medium', 'active', '2026-06-04 17:16:45', '2026-06-04 17:16:45'),
(75, 75, 2, 'How often must federal elections be held under the Charter (except in war or emergency)?', NULL, 'mcq', '1', 'The Charter guarantees that no government can hold power for more than five years without a federal election (except in time of war or national emergency).', 'medium', 'active', '2026-06-04 17:16:45', '2026-06-04 17:16:45'),
(76, 76, 2, 'Is military service in the Canadian Armed Forces compulsory for Canadian citizens?', NULL, 'mcq', '2', 'Military service is voluntary. Serving in the Canadian Forces (regular or reserve) or police is a noble way to contribute, but it is not compulsory.', 'medium', 'active', '2026-06-04 17:16:45', '2026-06-04 17:16:45'),
(77, 77, 2, 'Whose Aboriginal and treaty rights does the Constitution recognize and affirm?', NULL, 'mcq', '1', 'The Constitution Act, 1982 recognizes and affirms the Aboriginal and treaty rights of First Nations, Inuit and Métis peoples.', 'medium', 'active', '2026-06-04 17:16:45', '2026-06-04 17:16:45'),
(78, 78, 2, 'What is meant by \'the rule of law\'?', NULL, 'mcq', '1', 'The rule of law means no person or government is above the law — laws apply equally to all.', 'easy', 'active', '2026-06-04 17:16:45', '2026-06-04 17:16:45'),
(79, 79, 3, 'What language/dialect do the Métis speak?', NULL, 'mcq', '2', 'The Métis speak their own dialect, Michif, which blends Cree and French.', 'medium', 'active', '2026-06-04 17:16:45', '2026-06-04 17:16:45'),
(80, 80, 3, 'In what year did the Government of Canada formally apologize for the Indian Residential Schools system?', NULL, 'mcq', '2', 'In 2008, the Government of Canada formally apologized to former students of Indian Residential Schools and their families.', 'hard', 'active', '2026-06-04 17:16:45', '2026-06-04 17:16:45'),
(81, 81, 3, 'Approximately what share of the Aboriginal population in Canada is First Nations?', NULL, 'mcq', '2', 'About 65% of Aboriginal people are First Nations; the rest are Métis and Inuit.', 'hard', 'active', '2026-06-04 17:16:45', '2026-06-04 17:16:45'),
(82, 82, 3, 'Where do the Inuit primarily live?', NULL, 'mcq', '1', 'Inuit live in small, scattered communities across the Arctic, including Nunavut, Northwest Territories, Northern Quebec and Labrador.', 'medium', 'active', '2026-06-04 17:16:45', '2026-06-04 17:16:45'),
(83, 83, 3, 'Approximately how many Canadians have French as their first language?', NULL, 'mcq', '2', 'About seven million Canadians have French as their first language; most live in Quebec, with about one million Francophones outside Quebec.', 'medium', 'active', '2026-06-04 17:16:45', '2026-06-04 17:16:45'),
(84, 84, 3, 'Approximately how many Canadians have English as their first language?', NULL, 'mcq', '2', 'About 18 million Canadians have English as their first language. Many millions more speak it as a second language.', 'medium', 'active', '2026-06-04 17:16:45', '2026-06-04 17:16:45'),
(85, 85, 4, 'Which group established a brief North American settlement at L\'Anse aux Meadows around 1000 AD?', NULL, 'mcq', '1', 'Norse Vikings established a short-lived settlement at L\'Anse aux Meadows in Newfoundland around 1000 AD.', 'hard', 'active', '2026-06-04 17:16:45', '2026-06-04 17:16:45'),
(86, 86, 4, 'Who reached Newfoundland in 1497 and claimed it for England?', NULL, 'mcq', '1', 'John Cabot, an Italian navigator sailing for England, reached Newfoundland in 1497 and claimed it for England.', 'medium', 'active', '2026-06-04 17:16:45', '2026-06-04 17:16:45'),
(87, 87, 4, 'In what year did King Louis XIV make Canada a royal province of France?', NULL, 'mcq', '1', 'In 1663, Louis XIV (the \'Sun King\') made Canada a royal province with full government, including an Intendant and a Sovereign Council.', 'hard', 'active', '2026-06-04 17:16:45', '2026-06-04 17:16:45'),
(88, 88, 4, 'Who were the two opposing generals at the Battle of the Plains of Abraham in 1759?', NULL, 'mcq', '0', 'British General James Wolfe defeated French General Louis-Joseph de Montcalm at Quebec in 1759. Both generals died of wounds.', 'medium', 'active', '2026-06-04 17:16:45', '2026-06-04 17:16:45'),
(89, 89, 4, 'What did the Quebec Act of 1774 do?', NULL, 'mcq', '1', 'The Quebec Act (1774) accommodated the French-speaking Catholic majority by allowing religious freedom and restoring French civil law — helping Quebec remain loyal during the American Revolution.', 'hard', 'active', '2026-06-04 17:16:45', '2026-06-04 17:16:45'),
(90, 90, 4, 'Who were the Loyalists?', NULL, 'mcq', '2', 'Loyalists were people loyal to the Crown who left the United States during and after the American Revolution and settled in what is now Canada.', 'medium', 'active', '2026-06-04 17:16:45', '2026-06-04 17:16:45'),
(91, 91, 4, 'Who walked 30 km in 1813 to warn the British of an American attack at Beaver Dams?', NULL, 'mcq', '0', 'Laura Secord, a Loyalist wife and mother of five, made a dangerous trek of 30 kilometres on foot to warn the British of an impending American attack in 1813.', 'medium', 'active', '2026-06-04 17:16:45', '2026-06-04 17:16:45'),
(92, 92, 4, 'On which Canadian banknote does Sir John A. Macdonald appear?', NULL, 'mcq', '1', 'Sir John A. Macdonald, Canada\'s first Prime Minister, is featured on the $10 bill.', 'medium', 'active', '2026-06-04 17:16:45', '2026-06-04 17:16:45'),
(93, 93, 4, 'On which Canadian banknote does Sir Wilfrid Laurier appear?', NULL, 'mcq', '0', 'Sir Wilfrid Laurier, the first French Canadian Prime Minister (elected 1896), is featured on the $5 bill.', 'medium', 'active', '2026-06-04 17:16:45', '2026-06-04 17:16:45'),
(94, 94, 4, 'When did Newfoundland join Confederation?', NULL, 'mcq', '3', 'Newfoundland (now Newfoundland and Labrador) joined Confederation on March 31, 1949 — becoming Canada\'s tenth province.', 'hard', 'active', '2026-06-04 17:16:45', '2026-06-04 17:16:45'),
(95, 95, 4, 'What did the Statute of Westminster (1931) do?', NULL, 'mcq', '1', 'The Statute of Westminster (1931) granted Canada full legal autonomy from Britain — except for amendments to the Constitution, which still required British action until 1982.', 'hard', 'active', '2026-06-04 17:16:45', '2026-06-04 17:16:45'),
(96, 96, 4, 'Canadian forces fought in which war from 1950 to 1953?', NULL, 'mcq', '2', 'More than 26,000 Canadians served in the Korean War (1950–1953) as part of the United Nations forces; over 500 died.', 'medium', 'active', '2026-06-04 17:16:45', '2026-06-04 17:16:45'),
(97, 97, 4, 'Who commanded the Canadian Corps at Vimy Ridge?', NULL, 'mcq', '0', 'Lieutenant-General Sir Arthur Currie, Canada\'s greatest soldier, commanded the Canadian Corps at Vimy Ridge in April 1917.', 'hard', 'active', '2026-06-04 17:16:45', '2026-06-04 17:16:45'),
(98, 98, 5, 'In what year did Canada pass the Canadian Multiculturalism Act?', NULL, 'mcq', '2', 'The Canadian Multiculturalism Act was passed in 1988, making Canada one of the first countries to adopt multiculturalism as official policy.', 'medium', 'active', '2026-06-04 17:16:45', '2026-06-04 17:16:45'),
(99, 99, 5, 'In what year did First Nations people gain the unrestricted right to vote in federal elections?', NULL, 'mcq', '2', 'First Nations people gained the unrestricted right to vote in federal elections in 1960.', 'hard', 'active', '2026-06-04 17:16:45', '2026-06-04 17:16:45'),
(100, 100, 5, 'When was the Official Languages Act passed?', NULL, 'mcq', '2', 'The Official Languages Act (1969) gave English and French equal status in the federal government, under Prime Minister Pierre Trudeau.', 'medium', 'active', '2026-06-04 17:16:45', '2026-06-04 17:16:45'),
(101, 101, 5, 'In what year did Quebec hold its second referendum on sovereignty?', NULL, 'mcq', '3', 'Quebec held referendums on sovereignty in 1980 and 1995. The 1995 vote was defeated by a margin of about 50.6% to 49.4%.', 'hard', 'active', '2026-06-04 17:16:45', '2026-06-04 17:16:45'),
(102, 102, 5, 'On what date is the National Flag of Canada Day observed?', NULL, 'mcq', '1', 'National Flag of Canada Day is February 15, marking the date in 1965 when the Maple Leaf flag was raised for the first time.', 'easy', 'active', '2026-06-04 17:16:45', '2026-06-04 17:16:45'),
(103, 103, 6, 'Which of the following is a federal (national) responsibility?', NULL, 'mcq', '2', 'Federal jurisdiction includes national defence, foreign policy, citizenship, criminal law, currency, and other national matters.', 'medium', 'active', '2026-06-04 17:16:45', '2026-06-04 17:16:45'),
(104, 104, 6, 'Which of the following is mainly a provincial responsibility?', NULL, 'mcq', '2', 'Provinces have jurisdiction over education, healthcare delivery, civil law, natural resources and other provincial matters.', 'medium', 'active', '2026-06-04 17:16:45', '2026-06-04 17:16:45'),
(105, 105, 6, 'Who represents the Sovereign at the provincial level?', NULL, 'mcq', '1', 'Each province has a Lieutenant Governor as the Sovereign\'s representative; at the federal level the Sovereign is represented by the Governor General.', 'hard', 'active', '2026-06-04 17:16:45', '2026-06-04 17:16:45'),
(106, 106, 6, 'What is the title of the head of government in a province?', NULL, 'mcq', '1', 'The leader of the elected provincial party with the most seats becomes the Premier. The PM leads the federal government.', 'medium', 'active', '2026-06-04 17:16:45', '2026-06-04 17:16:45'),
(107, 107, 6, 'Until what age do Canadian senators serve?', NULL, 'mcq', '2', 'Senators are appointed by the Governor General on the PM\'s advice and serve until age 75.', 'hard', 'active', '2026-06-04 17:16:45', '2026-06-04 17:16:45'),
(108, 108, 6, 'Who selects the Cabinet ministers?', NULL, 'mcq', '2', 'The Prime Minister chooses Cabinet ministers, who are usually MPs from the governing party. Cabinet sets government policy.', 'medium', 'active', '2026-06-04 17:16:45', '2026-06-04 17:16:45'),
(109, 109, 7, 'What is another name for an electoral district in Canada?', NULL, 'mcq', '1', 'Electoral districts are commonly called \'ridings\' or constituencies. Each elects one MP.', 'easy', 'active', '2026-06-04 17:16:45', '2026-06-04 17:16:45'),
(110, 110, 7, 'When you vote in a federal election, you must show proof of which of the following?', NULL, 'mcq', '0', 'Voters must prove their identity and address (with accepted ID) before receiving a ballot.', 'medium', 'active', '2026-06-04 17:16:45', '2026-06-04 17:16:45'),
(111, 111, 7, 'In Quebec, members of the provincial legislature are called?', NULL, 'mcq', '2', 'In Quebec, the provincial legislature is the Assemblée nationale and its members are MNAs (Members of the National Assembly).', 'hard', 'active', '2026-06-04 17:16:45', '2026-06-04 17:16:45'),
(112, 112, 7, 'In Ontario, members of the provincial legislature are called?', NULL, 'mcq', '1', 'Ontario calls its provincial legislators MPPs (Members of Provincial Parliament).', 'hard', 'active', '2026-06-04 17:16:45', '2026-06-04 17:16:45'),
(113, 113, 7, 'Who do voters elect at the municipal level?', NULL, 'mcq', '2', 'Municipal elections choose mayors and councillors who run cities and towns.', 'easy', 'active', '2026-06-04 17:16:45', '2026-06-04 17:16:45'),
(114, 114, 8, 'If you are arrested in Canada, what right do you have?', NULL, 'mcq', '0', 'You have the right to retain and instruct legal counsel without delay, and to be informed of that right. Legal aid is available for those who cannot afford a lawyer.', 'easy', 'active', '2026-06-04 17:16:45', '2026-06-04 17:16:45'),
(115, 115, 8, 'What does RCMP stand for?', NULL, 'mcq', '1', 'The Royal Canadian Mounted Police (RCMP) is the federal police force and also acts as the provincial police in most provinces and territories.', 'easy', 'active', '2026-06-04 17:16:45', '2026-06-04 17:16:45'),
(116, 116, 8, 'Which two provinces have their own provincial police forces (not the RCMP)?', NULL, 'mcq', '0', 'Ontario (Ontario Provincial Police, OPP) and Quebec (Sûreté du Québec) have their own provincial police forces. The RCMP serves as the provincial police force elsewhere.', 'hard', 'active', '2026-06-04 17:16:45', '2026-06-04 17:16:45'),
(117, 117, 9, 'On what date was the Maple Leaf flag raised for the first time?', NULL, 'mcq', '1', 'The Maple Leaf flag was raised for the first time on February 15, 1965 — now National Flag of Canada Day.', 'medium', 'active', '2026-06-04 17:16:45', '2026-06-04 17:16:45'),
(118, 118, 9, 'What does the Crown symbolize in Canada?', NULL, 'mcq', '0', 'The Crown is a symbol of Canada\'s parliamentary democracy and represents the Sovereign and the institutions of government.', 'medium', 'active', '2026-06-04 17:16:45', '2026-06-04 17:16:45'),
(119, 119, 9, 'What is Canada\'s official motto?', NULL, 'mcq', '1', 'Canada\'s national motto is \'A mari usque ad mare,\' Latin for \'From sea to sea.\'', 'hard', 'active', '2026-06-04 17:16:45', '2026-06-04 17:16:45'),
(120, 120, 9, 'Who composed the music for \'O Canada\'?', NULL, 'mcq', '0', 'The music of \'O Canada\' was composed by Calixa Lavallée in 1880. The French lyrics are by Sir Adolphe-Basile Routhier; the English lyrics were adapted by Robert Stanley Weir.', 'hard', 'active', '2026-06-04 17:16:45', '2026-06-04 17:16:45'),
(121, 121, 9, 'In what year was \'O Canada\' officially proclaimed Canada\'s national anthem?', NULL, 'mcq', '3', '\'O Canada\' was proclaimed as Canada\'s national anthem in 1980, although it had been sung at official events since 1880.', 'medium', 'active', '2026-06-04 17:16:45', '2026-06-04 17:16:45'),
(122, 122, 9, 'Which sport is Canada\'s national winter sport?', NULL, 'mcq', '1', 'Hockey is Canada\'s national winter sport. Lacrosse is Canada\'s national summer sport (both recognized by federal law in 1994).', 'medium', 'active', '2026-06-04 17:16:45', '2026-06-04 17:16:45'),
(123, 123, 9, 'What is Canada\'s national summer sport?', NULL, 'mcq', '2', 'Lacrosse, which has Indigenous origins, is Canada\'s national summer sport.', 'medium', 'active', '2026-06-04 17:16:45', '2026-06-04 17:16:45'),
(124, 124, 9, 'When is Remembrance Day observed in Canada?', NULL, 'mcq', '2', 'Remembrance Day is observed on November 11, the anniversary of the end of World War I, to honour those who have served in war.', 'easy', 'active', '2026-06-04 17:16:45', '2026-06-04 17:16:45'),
(125, 125, 9, 'In what year was the Order of Canada created?', NULL, 'mcq', '1', 'The Order of Canada was created in 1967, the centennial of Confederation, to honour outstanding lifetime contributions to the country.', 'hard', 'active', '2026-06-04 17:16:45', '2026-06-04 17:16:45'),
(126, 126, 10, 'Which institution produces Canada\'s circulation coins?', NULL, 'mcq', '1', 'The Royal Canadian Mint produces Canada\'s circulation coins. The Bank of Canada issues banknotes.', 'hard', 'active', '2026-06-04 17:16:45', '2026-06-04 17:16:45'),
(127, 127, 10, 'What is the name of Canada\'s central bank?', NULL, 'mcq', '2', 'The Bank of Canada is Canada\'s central bank. It sets monetary policy and issues banknotes.', 'medium', 'active', '2026-06-04 17:16:45', '2026-06-04 17:16:45'),
(128, 128, 10, 'Canada is a member of which group of seven major advanced economies?', NULL, 'mcq', '0', 'Canada is a member of the G7 (Group of Seven) alongside the US, UK, France, Germany, Italy and Japan. Canada is also part of the G20.', 'hard', 'active', '2026-06-04 17:16:45', '2026-06-04 17:16:45'),
(129, 129, 10, 'Which industry sector employs the most Canadians?', NULL, 'mcq', '2', 'Service industries employ most Canadians — including transportation, education, healthcare, construction, banking, communications, retail, tourism, and government.', 'medium', 'active', '2026-06-04 17:16:45', '2026-06-04 17:16:45'),
(130, 130, 11, 'What is the capital of Newfoundland and Labrador?', NULL, 'mcq', '2', 'St. John\'s is the capital of Newfoundland and Labrador — and the easternmost city in North America.', 'easy', 'active', '2026-06-04 17:16:45', '2026-06-04 17:16:45'),
(131, 131, 11, 'What is the capital of Prince Edward Island?', NULL, 'mcq', '1', 'Charlottetown is the capital of Prince Edward Island, known as the \'Birthplace of Confederation\' for the 1864 conference.', 'easy', 'active', '2026-06-04 17:16:45', '2026-06-04 17:16:45'),
(132, 132, 11, 'What is the capital of Nova Scotia?', NULL, 'mcq', '1', 'Halifax is the capital of Nova Scotia, a major shipping centre on the Atlantic.', 'easy', 'active', '2026-06-04 17:16:45', '2026-06-04 17:16:45'),
(133, 133, 11, 'What is the capital of New Brunswick?', NULL, 'mcq', '2', 'Fredericton is the capital of New Brunswick — Canada\'s only officially bilingual province.', 'easy', 'active', '2026-06-04 17:16:45', '2026-06-04 17:16:45'),
(134, 134, 11, 'Which province is officially bilingual?', NULL, 'mcq', '2', 'New Brunswick is the only officially bilingual province (English and French).', 'medium', 'active', '2026-06-04 17:16:45', '2026-06-04 17:16:45'),
(135, 135, 11, 'What is the capital of Quebec?', NULL, 'mcq', '1', 'Quebec City is the capital of Quebec. Montreal is the largest city and the second-largest French-speaking city in the world.', 'easy', 'active', '2026-06-04 17:16:45', '2026-06-04 17:16:45'),
(136, 136, 11, 'What is the capital of Ontario?', NULL, 'mcq', '0', 'Toronto is the capital of Ontario and Canada\'s largest city — the financial centre of the country. Ottawa is the federal capital.', 'easy', 'active', '2026-06-04 17:16:45', '2026-06-04 17:16:45'),
(137, 137, 11, 'What is the capital of Manitoba?', NULL, 'mcq', '1', 'Winnipeg is the capital of Manitoba — historically the centre of the Métis nation.', 'easy', 'active', '2026-06-04 17:16:45', '2026-06-04 17:16:45'),
(138, 138, 11, 'What is the capital of Saskatchewan?', NULL, 'mcq', '1', 'Regina is the capital of Saskatchewan and home to the RCMP training academy. Saskatoon is the province\'s largest city.', 'easy', 'active', '2026-06-04 17:16:45', '2026-06-04 17:16:45'),
(139, 139, 11, 'What is the capital of Alberta?', NULL, 'mcq', '1', 'Edmonton is the capital of Alberta. Calgary is the largest city and famous for the Calgary Stampede.', 'easy', 'active', '2026-06-04 17:16:45', '2026-06-04 17:16:45'),
(140, 140, 11, 'What is the capital of Yukon?', NULL, 'mcq', '1', 'Whitehorse is the capital of Yukon, famous for the Klondike Gold Rush in the 1890s.', 'medium', 'active', '2026-06-04 17:16:45', '2026-06-04 17:16:45'),
(141, 141, 11, 'What is the capital of the Northwest Territories?', NULL, 'mcq', '2', 'Yellowknife is the capital of the Northwest Territories — known for diamond mining.', 'medium', 'active', '2026-06-04 17:16:45', '2026-06-04 17:16:45'),
(142, 142, 11, 'What is the capital of Nunavut?', NULL, 'mcq', '0', 'Iqaluit is the capital of Nunavut, the newest territory (created in 1999).', 'medium', 'active', '2026-06-04 17:16:45', '2026-06-04 17:16:45'),
(143, 143, 11, 'Which Canadian port is the country\'s largest and busiest?', NULL, 'mcq', '2', 'The Port of Vancouver, on Canada\'s Pacific coast, is the country\'s largest and busiest port.', 'hard', 'active', '2026-06-04 17:16:45', '2026-06-04 17:16:45'),
(144, 144, 11, 'Which Canadian city is the only walled city north of Mexico?', NULL, 'mcq', '0', 'Quebec City is the only walled city north of Mexico, a UNESCO World Heritage Site.', 'hard', 'active', '2026-06-04 17:16:45', '2026-06-04 17:16:45'),
(145, 145, 11, 'Who chose Ottawa as the capital of Canada in 1857?', NULL, 'mcq', '0', 'Queen Victoria chose Ottawa as the capital of the Province of Canada in 1857; it became the national capital at Confederation in 1867.', 'medium', 'active', '2026-06-04 17:16:45', '2026-06-04 17:16:45'),
(148, 1, 2, 'What are three responsibilities of citizenship?', NULL, 'mcq', '1', 'Canadian responsibilities include obeying the law, taking responsibility for oneself and one\'s family, serving on a jury, voting in elections, helping others in the community, and protecting and enjoying our heritage and environment.', 'easy', 'active', '2026-06-04 21:49:22', '2026-06-04 21:49:22');

-- --------------------------------------------------------

--
-- Table structure for table `practice_question_options`
--

CREATE TABLE `practice_question_options` (
  `id` int(11) NOT NULL,
  `question_id` int(11) NOT NULL,
  `option_text` text NOT NULL,
  `is_correct` tinyint(1) NOT NULL DEFAULT 0,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `practice_question_options`
--

INSERT INTO `practice_question_options` (`id`, `question_id`, `option_text`, `is_correct`, `created_at`, `updated_at`) VALUES
(5, 2, 'The Magna Carta and the Bill of Rights, 1689.', 0, '2026-06-04 17:16:44', '2026-06-04 17:16:44'),
(6, 2, 'The Canadian Charter of Rights and Freedoms and the Canadian Human Rights Act.', 1, '2026-06-04 17:16:44', '2026-06-04 17:16:44'),
(7, 2, 'The Declaration of Independence and the Constitution of the United States.', 0, '2026-06-04 17:16:44', '2026-06-04 17:16:44'),
(8, 2, 'The Quebec Act and the Indian Act.', 0, '2026-06-04 17:16:44', '2026-06-04 17:16:44'),
(9, 3, 'Freedom of conscience and religion.', 0, '2026-06-04 17:16:44', '2026-06-04 17:16:44'),
(10, 3, 'Freedom of thought, belief, opinion and expression.', 0, '2026-06-04 17:16:44', '2026-06-04 17:16:44'),
(11, 3, 'Freedom of peaceful assembly.', 0, '2026-06-04 17:16:44', '2026-06-04 17:16:44'),
(12, 3, 'Freedom from paying taxes.', 1, '2026-06-04 17:16:44', '2026-06-04 17:16:44'),
(13, 4, 'Women and men work the same jobs.', 0, '2026-06-04 17:16:44', '2026-06-04 17:16:44'),
(14, 4, 'Men and women earn identical incomes by law.', 0, '2026-06-04 17:16:44', '2026-06-04 17:16:44'),
(15, 4, 'Both women and men are equal under the law; gender-based violence and \'honour killings\' are crimes.', 1, '2026-06-04 17:16:44', '2026-06-04 17:16:44'),
(16, 4, 'Only men can hold political office.', 0, '2026-06-04 17:16:44', '2026-06-04 17:16:44'),
(17, 5, 'Aboriginal Peoples\' rights.', 0, '2026-06-04 17:16:44', '2026-06-04 17:16:44'),
(18, 5, 'Official language rights and minority language educational rights.', 0, '2026-06-04 17:16:44', '2026-06-04 17:16:44'),
(19, 5, 'Mobility rights.', 1, '2026-06-04 17:16:44', '2026-06-04 17:16:44'),
(20, 5, 'Multiculturalism rights.', 0, '2026-06-04 17:16:44', '2026-06-04 17:16:44'),
(21, 6, 'Owning property.', 0, '2026-06-04 17:16:44', '2026-06-04 17:16:44'),
(22, 6, 'Serving on a jury when called.', 1, '2026-06-04 17:16:44', '2026-06-04 17:16:44'),
(23, 6, 'Belonging to a political party.', 0, '2026-06-04 17:16:44', '2026-06-04 17:16:44'),
(24, 6, 'Speaking both official languages.', 0, '2026-06-04 17:16:44', '2026-06-04 17:16:44'),
(25, 7, 'The right to vote.', 0, '2026-06-04 17:16:44', '2026-06-04 17:16:44'),
(26, 7, 'The right to challenge unlawful detention by the state.', 1, '2026-06-04 17:16:44', '2026-06-04 17:16:44'),
(27, 7, 'The right to free speech.', 0, '2026-06-04 17:16:44', '2026-06-04 17:16:44'),
(28, 7, 'The right to own property.', 0, '2026-06-04 17:16:44', '2026-06-04 17:16:44'),
(29, 8, 'Getting a job, taking care of one\'s family, and working hard.', 1, '2026-06-04 17:16:44', '2026-06-04 17:16:44'),
(30, 8, 'Only voting in elections.', 0, '2026-06-04 17:16:44', '2026-06-04 17:16:44'),
(31, 8, 'Only paying taxes.', 0, '2026-06-04 17:16:44', '2026-06-04 17:16:44'),
(32, 8, 'Only attending citizenship ceremonies.', 0, '2026-06-04 17:16:44', '2026-06-04 17:16:44'),
(33, 9, 'British, French and German.', 0, '2026-06-04 17:16:44', '2026-06-04 17:16:44'),
(34, 9, 'Aboriginal, French and British.', 1, '2026-06-04 17:16:44', '2026-06-04 17:16:44'),
(35, 9, 'Spanish, Portuguese and Dutch.', 0, '2026-06-04 17:16:44', '2026-06-04 17:16:44'),
(36, 9, 'Scottish, Irish and Welsh.', 0, '2026-06-04 17:16:44', '2026-06-04 17:16:44'),
(37, 10, 'Recent immigrants from France.', 0, '2026-06-04 17:16:44', '2026-06-04 17:16:44'),
(38, 10, 'A distinct people of mixed Aboriginal and European ancestry, the majority of whom live on the Prairies.', 1, '2026-06-04 17:16:44', '2026-06-04 17:16:44'),
(39, 10, 'Inuit who live in the Arctic.', 0, '2026-06-04 17:16:44', '2026-06-04 17:16:44'),
(40, 10, 'Members of the First Nations only.', 0, '2026-06-04 17:16:44', '2026-06-04 17:16:44'),
(41, 11, '\'The people\' in the Inuktitut language.', 1, '2026-06-04 17:16:44', '2026-06-04 17:16:44'),
(42, 11, '\'The hunters\' in French.', 0, '2026-06-04 17:16:44', '2026-06-04 17:16:44'),
(43, 11, '\'The northerners\' in English.', 0, '2026-06-04 17:16:44', '2026-06-04 17:16:44'),
(44, 11, '\'The travelers\' in Cree.', 0, '2026-06-04 17:16:44', '2026-06-04 17:16:44'),
(45, 12, 'First Nations, Métis, and Inuit.', 1, '2026-06-04 17:16:44', '2026-06-04 17:16:44'),
(46, 12, 'Cree, Iroquois, and Algonquin.', 0, '2026-06-04 17:16:44', '2026-06-04 17:16:44'),
(47, 12, 'Anglophones, Francophones, and Allophones.', 0, '2026-06-04 17:16:44', '2026-06-04 17:16:44'),
(48, 12, 'Eastern, Central, and Western peoples.', 0, '2026-06-04 17:16:44', '2026-06-04 17:16:44'),
(49, 13, 'English and Spanish.', 0, '2026-06-04 17:16:44', '2026-06-04 17:16:44'),
(50, 13, 'English and French.', 1, '2026-06-04 17:16:44', '2026-06-04 17:16:44'),
(51, 13, 'French and Inuktitut.', 0, '2026-06-04 17:16:44', '2026-06-04 17:16:44'),
(52, 13, 'English and Mandarin.', 0, '2026-06-04 17:16:44', '2026-06-04 17:16:44'),
(53, 14, 'British Columbia.', 0, '2026-06-04 17:16:44', '2026-06-04 17:16:44'),
(54, 14, 'Quebec.', 1, '2026-06-04 17:16:44', '2026-06-04 17:16:44'),
(55, 14, 'Alberta.', 0, '2026-06-04 17:16:44', '2026-06-04 17:16:44'),
(56, 14, 'Nova Scotia.', 0, '2026-06-04 17:16:44', '2026-06-04 17:16:44'),
(57, 15, 'British settlers in Ontario.', 0, '2026-06-04 17:16:44', '2026-06-04 17:16:44'),
(58, 15, 'Descendants of French colonists who settled in what are now the Maritime provinces.', 1, '2026-06-04 17:16:44', '2026-06-04 17:16:44'),
(59, 15, 'Inuit communities in Nunavut.', 0, '2026-06-04 17:16:44', '2026-06-04 17:16:44'),
(60, 15, 'Recent immigrants from France.', 0, '2026-06-04 17:16:44', '2026-06-04 17:16:44'),
(61, 16, 'A person whose first language is English.', 1, '2026-06-04 17:16:44', '2026-06-04 17:16:44'),
(62, 16, 'A person whose first language is French.', 0, '2026-06-04 17:16:44', '2026-06-04 17:16:44'),
(63, 16, 'A person from England only.', 0, '2026-06-04 17:16:44', '2026-06-04 17:16:44'),
(64, 16, 'A person who speaks an Indigenous language.', 0, '2026-06-04 17:16:44', '2026-06-04 17:16:44'),
(65, 17, 'Bilingual Canadians.', 0, '2026-06-04 17:16:44', '2026-06-04 17:16:44'),
(66, 17, 'Allophones.', 1, '2026-06-04 17:16:44', '2026-06-04 17:16:44'),
(67, 17, 'New Canadians.', 0, '2026-06-04 17:16:44', '2026-06-04 17:16:44'),
(68, 17, 'Anglophones.', 0, '2026-06-04 17:16:44', '2026-06-04 17:16:44'),
(69, 18, 'The joining of provinces to create a new country.', 1, '2026-06-04 17:16:44', '2026-06-04 17:16:44'),
(70, 18, 'The signing of a peace treaty with the United States.', 0, '2026-06-04 17:16:44', '2026-06-04 17:16:44'),
(71, 18, 'The arrival of the first European explorers.', 0, '2026-06-04 17:16:44', '2026-06-04 17:16:44'),
(72, 18, 'The establishment of the Canadian Pacific Railway.', 0, '2026-06-04 17:16:44', '2026-06-04 17:16:44'),
(73, 19, '1812.', 0, '2026-06-04 17:16:44', '2026-06-04 17:16:44'),
(74, 19, '1867.', 1, '2026-06-04 17:16:44', '2026-06-04 17:16:44'),
(75, 19, '1905.', 0, '2026-06-04 17:16:44', '2026-06-04 17:16:44'),
(76, 19, '1982.', 0, '2026-06-04 17:16:44', '2026-06-04 17:16:44'),
(77, 20, 'Sir Wilfrid Laurier.', 0, '2026-06-04 17:16:44', '2026-06-04 17:16:44'),
(78, 20, 'Sir John A. Macdonald.', 1, '2026-06-04 17:16:44', '2026-06-04 17:16:44'),
(79, 20, 'Sir George-Étienne Cartier.', 0, '2026-06-04 17:16:44', '2026-06-04 17:16:44'),
(80, 20, 'Sir Louis-Hippolyte La Fontaine.', 0, '2026-06-04 17:16:44', '2026-06-04 17:16:44'),
(81, 21, 'Government where the prime minister must be elected directly by the people.', 0, '2026-06-04 17:16:44', '2026-06-04 17:16:44'),
(82, 21, 'Government where ministers of the Crown must have the support of a majority of elected representatives.', 1, '2026-06-04 17:16:44', '2026-06-04 17:16:44'),
(83, 21, 'Government that takes responsibility for all citizens\' welfare.', 0, '2026-06-04 17:16:44', '2026-06-04 17:16:44'),
(84, 21, 'Government where the Queen makes all decisions.', 0, '2026-06-04 17:16:44', '2026-06-04 17:16:44'),
(85, 22, 'A British general at the Battle of the Plains of Abraham.', 0, '2026-06-04 17:16:44', '2026-06-04 17:16:44'),
(86, 22, 'A champion of French language rights and the first head of a responsible government in Canada (1849).', 1, '2026-06-04 17:16:44', '2026-06-04 17:16:44'),
(87, 22, 'The founder of the Hudson\'s Bay Company.', 0, '2026-06-04 17:16:44', '2026-06-04 17:16:44'),
(88, 22, 'The leader of the Métis people at Batoche.', 0, '2026-06-04 17:16:44', '2026-06-04 17:16:44'),
(89, 23, 'Canada\'s commitment to international trade only.', 0, '2026-06-04 17:16:44', '2026-06-04 17:16:44'),
(90, 23, 'Unity and a country united by rail from sea to sea.', 1, '2026-06-04 17:16:44', '2026-06-04 17:16:44'),
(91, 23, 'British military strength in North America.', 0, '2026-06-04 17:16:44', '2026-06-04 17:16:44'),
(92, 23, 'The defeat of Indigenous peoples.', 0, '2026-06-04 17:16:44', '2026-06-04 17:16:44'),
(93, 24, 'It created a new export industry for Canada.', 0, '2026-06-04 17:16:44', '2026-06-04 17:16:44'),
(94, 24, 'It saved millions of lives from diabetes worldwide.', 1, '2026-06-04 17:16:44', '2026-06-04 17:16:44'),
(95, 24, 'It started the Canadian medical school system.', 0, '2026-06-04 17:16:44', '2026-06-04 17:16:44'),
(96, 24, 'It led to Canada\'s independence from Britain.', 0, '2026-06-04 17:16:44', '2026-06-04 17:16:44'),
(97, 25, 'Sir John A. Macdonald.', 0, '2026-06-04 17:16:44', '2026-06-04 17:16:44'),
(98, 25, 'Sir Isaac Brock and Chief Tecumseh.', 1, '2026-06-04 17:16:44', '2026-06-04 17:16:44'),
(99, 25, 'Louis Riel.', 0, '2026-06-04 17:16:44', '2026-06-04 17:16:44'),
(100, 25, 'Sir Wilfrid Laurier.', 0, '2026-06-04 17:16:44', '2026-06-04 17:16:44'),
(101, 26, 'The Battle of the Somme.', 0, '2026-06-04 17:16:44', '2026-06-04 17:16:44'),
(102, 26, 'The Battle of Vimy Ridge.', 1, '2026-06-04 17:16:44', '2026-06-04 17:16:44'),
(103, 26, 'The Battle of Britain.', 0, '2026-06-04 17:16:44', '2026-06-04 17:16:44'),
(104, 26, 'The Battle of Dieppe.', 0, '2026-06-04 17:16:44', '2026-06-04 17:16:44'),
(105, 27, 'Canada played no significant role.', 0, '2026-06-04 17:16:44', '2026-06-04 17:16:44'),
(106, 27, 'More than one million Canadians served, including the D-Day landing at Juno Beach in 1944.', 1, '2026-06-04 17:16:44', '2026-06-04 17:16:44'),
(107, 27, 'Canada only sent supplies, not troops.', 0, '2026-06-04 17:16:44', '2026-06-04 17:16:44'),
(108, 27, 'Canada remained neutral throughout the war.', 0, '2026-06-04 17:16:44', '2026-06-04 17:16:44'),
(109, 28, 'John Cabot.', 0, '2026-06-04 17:16:44', '2026-06-04 17:16:44'),
(110, 28, 'Jacques Cartier.', 1, '2026-06-04 17:16:44', '2026-06-04 17:16:44'),
(111, 28, 'Samuel de Champlain.', 0, '2026-06-04 17:16:44', '2026-06-04 17:16:44'),
(112, 28, 'Henry Hudson.', 0, '2026-06-04 17:16:44', '2026-06-04 17:16:44'),
(113, 29, 'Jacques Cartier.', 0, '2026-06-04 17:16:44', '2026-06-04 17:16:44'),
(114, 29, 'Samuel de Champlain.', 1, '2026-06-04 17:16:44', '2026-06-04 17:16:44'),
(115, 29, 'Sir John A. Macdonald.', 0, '2026-06-04 17:16:44', '2026-06-04 17:16:44'),
(116, 29, 'Louis Riel.', 0, '2026-06-04 17:16:44', '2026-06-04 17:16:44'),
(117, 30, 'Ontario.', 0, '2026-06-04 17:16:44', '2026-06-04 17:16:44'),
(118, 30, 'Quebec.', 0, '2026-06-04 17:16:44', '2026-06-04 17:16:44'),
(119, 30, 'Manitoba.', 1, '2026-06-04 17:16:44', '2026-06-04 17:16:44'),
(120, 30, 'British Columbia.', 0, '2026-06-04 17:16:44', '2026-06-04 17:16:44'),
(121, 31, '1867.', 0, '2026-06-04 17:16:44', '2026-06-04 17:16:44'),
(122, 31, '1965.', 0, '2026-06-04 17:16:44', '2026-06-04 17:16:44'),
(123, 31, '1982.', 1, '2026-06-04 17:16:44', '2026-06-04 17:16:44'),
(124, 31, '2001.', 0, '2026-06-04 17:16:44', '2026-06-04 17:16:44'),
(125, 32, '1867.', 0, '2026-06-04 17:16:44', '2026-06-04 17:16:44'),
(126, 32, '1965.', 1, '2026-06-04 17:16:44', '2026-06-04 17:16:44'),
(127, 32, '1982.', 0, '2026-06-04 17:16:44', '2026-06-04 17:16:44'),
(128, 32, '2001.', 0, '2026-06-04 17:16:44', '2026-06-04 17:16:44'),
(129, 33, 'Sir Wilfrid Laurier.', 0, '2026-06-04 17:16:44', '2026-06-04 17:16:44'),
(130, 33, 'Tommy Douglas.', 1, '2026-06-04 17:16:44', '2026-06-04 17:16:44'),
(131, 33, 'John Diefenbaker.', 0, '2026-06-04 17:16:44', '2026-06-04 17:16:44'),
(132, 33, 'Pierre Trudeau.', 0, '2026-06-04 17:16:44', '2026-06-04 17:16:44'),
(133, 34, 'John Diefenbaker.', 1, '2026-06-04 17:16:44', '2026-06-04 17:16:44'),
(134, 34, 'Lester B. Pearson.', 0, '2026-06-04 17:16:44', '2026-06-04 17:16:44'),
(135, 34, 'Pierre Trudeau.', 0, '2026-06-04 17:16:44', '2026-06-04 17:16:44'),
(136, 34, 'Tommy Douglas.', 0, '2026-06-04 17:16:44', '2026-06-04 17:16:44'),
(137, 35, 'The monarch makes all the laws.', 0, '2026-06-04 17:16:44', '2026-06-04 17:16:44'),
(138, 35, 'Canada\'s head of state is a hereditary Sovereign who reigns in accordance with the Constitution.', 1, '2026-06-04 17:16:44', '2026-06-04 17:16:44'),
(139, 35, 'Canada has no monarchy.', 0, '2026-06-04 17:16:44', '2026-06-04 17:16:44'),
(140, 35, 'The Prime Minister is the King or Queen.', 0, '2026-06-04 17:16:44', '2026-06-04 17:16:44'),
(141, 36, 'Federal, provincial and municipal.', 0, '2026-06-04 17:16:44', '2026-06-04 17:16:44'),
(142, 36, 'Executive, legislative and judicial.', 1, '2026-06-04 17:16:44', '2026-06-04 17:16:44'),
(143, 36, 'Liberal, Conservative and NDP.', 0, '2026-06-04 17:16:44', '2026-06-04 17:16:44'),
(144, 36, 'House of Commons, Senate and Cabinet.', 0, '2026-06-04 17:16:44', '2026-06-04 17:16:44'),
(145, 37, 'The Queen makes laws; the PM enforces them.', 0, '2026-06-04 17:16:44', '2026-06-04 17:16:44'),
(146, 37, 'The Queen is head of state; the Prime Minister is head of government.', 1, '2026-06-04 17:16:44', '2026-06-04 17:16:44'),
(147, 37, 'There is no difference — they share the same role.', 0, '2026-06-04 17:16:44', '2026-06-04 17:16:44'),
(148, 37, 'The Queen is elected; the PM is appointed.', 0, '2026-06-04 17:16:44', '2026-06-04 17:16:44'),
(149, 38, 'Federal, provincial/territorial and municipal.', 1, '2026-06-04 17:16:44', '2026-06-04 17:16:44'),
(150, 38, 'Executive, legislative and judicial.', 0, '2026-06-04 17:16:44', '2026-06-04 17:16:44'),
(151, 38, 'Monarchy, Parliament and Courts.', 0, '2026-06-04 17:16:44', '2026-06-04 17:16:44'),
(152, 38, 'Cabinet, House of Commons and Senate.', 0, '2026-06-04 17:16:44', '2026-06-04 17:16:44'),
(153, 39, 'The Prime Minister, the Cabinet and the courts.', 0, '2026-06-04 17:16:44', '2026-06-04 17:16:44'),
(154, 39, 'The Sovereign (Queen or King), the Senate and the House of Commons.', 1, '2026-06-04 17:16:44', '2026-06-04 17:16:44'),
(155, 39, 'The provinces, the territories and the federal government.', 0, '2026-06-04 17:16:44', '2026-06-04 17:16:44'),
(156, 39, 'Liberals, Conservatives and Independents.', 0, '2026-06-04 17:16:44', '2026-06-04 17:16:44'),
(157, 40, 'They are elected by voters.', 0, '2026-06-04 17:16:44', '2026-06-04 17:16:44'),
(158, 40, 'They are appointed by the Governor General on the advice of the Prime Minister.', 1, '2026-06-04 17:16:44', '2026-06-04 17:16:44'),
(159, 40, 'They are appointed by the Queen.', 0, '2026-06-04 17:16:44', '2026-06-04 17:16:44'),
(160, 40, 'They inherit their seats.', 0, '2026-06-04 17:16:44', '2026-06-04 17:16:44'),
(161, 41, 'They are appointed by the United Nations.', 0, '2026-06-04 17:16:44', '2026-06-04 17:16:44'),
(162, 41, 'They are chosen by the provincial premiers.', 0, '2026-06-04 17:16:44', '2026-06-04 17:16:44'),
(163, 41, 'They are elected by voters in their local constituency (riding).', 1, '2026-06-04 17:16:44', '2026-06-04 17:16:44'),
(164, 41, 'They are elected by landowners and police chiefs.', 0, '2026-06-04 17:16:44', '2026-06-04 17:16:44'),
(165, 42, 'Only Canadian-born citizens.', 0, '2026-06-04 17:16:44', '2026-06-04 17:16:44'),
(166, 42, 'Canadian citizens aged 18 or older.', 1, '2026-06-04 17:16:44', '2026-06-04 17:16:44'),
(167, 42, 'Permanent residents and citizens.', 0, '2026-06-04 17:16:44', '2026-06-04 17:16:44'),
(168, 42, 'Any resident of Canada over 16.', 0, '2026-06-04 17:16:44', '2026-06-04 17:16:44'),
(169, 43, 'Yes — you must tell your employer.', 0, '2026-06-04 17:16:44', '2026-06-04 17:16:44'),
(170, 43, 'Yes — you must tell your spouse.', 0, '2026-06-04 17:16:44', '2026-06-04 17:16:44'),
(171, 43, 'No — your vote is secret.', 1, '2026-06-04 17:16:44', '2026-06-04 17:16:44'),
(172, 43, 'Yes — you must inform Elections Canada.', 0, '2026-06-04 17:16:44', '2026-06-04 17:16:44'),
(173, 44, 'The party with the most senators.', 0, '2026-06-04 17:16:45', '2026-06-04 17:16:45'),
(174, 44, 'The party with the most elected representatives (MPs) in the House of Commons.', 1, '2026-06-04 17:16:45', '2026-06-04 17:16:45'),
(175, 44, 'The party chosen by the Senate.', 0, '2026-06-04 17:16:45', '2026-06-04 17:16:45'),
(176, 44, 'The party that wins the popular vote in Quebec.', 0, '2026-06-04 17:16:45', '2026-06-04 17:16:45'),
(177, 45, 'Announce loudly who you are voting for.', 0, '2026-06-04 17:16:45', '2026-06-04 17:16:45'),
(178, 45, 'Provide proof of identity and address, then mark an X on the ballot beside one candidate\'s name.', 1, '2026-06-04 17:16:45', '2026-06-04 17:16:45'),
(179, 45, 'Sign your name beside your chosen candidate on a public list.', 0, '2026-06-04 17:16:45', '2026-06-04 17:16:45'),
(180, 45, 'Tell the official who you want to vote for and they will mark the ballot.', 0, '2026-06-04 17:16:45', '2026-06-04 17:16:45'),
(181, 46, 'When one party holds at least half the seats in the House of Commons.', 1, '2026-06-04 17:16:45', '2026-06-04 17:16:45'),
(182, 46, 'When the party in power wins less than half the seats.', 0, '2026-06-04 17:16:45', '2026-06-04 17:16:45'),
(183, 46, 'When the Senate has more members than the House.', 0, '2026-06-04 17:16:45', '2026-06-04 17:16:45'),
(184, 46, 'When the Prime Minister is elected directly by the people.', 0, '2026-06-04 17:16:45', '2026-06-04 17:16:45'),
(185, 47, 'To make new laws.', 0, '2026-06-04 17:16:45', '2026-06-04 17:16:45'),
(186, 47, 'To settle disputes and decide whether someone has broken a law.', 1, '2026-06-04 17:16:45', '2026-06-04 17:16:45'),
(187, 47, 'To elect government leaders.', 0, '2026-06-04 17:16:45', '2026-06-04 17:16:45'),
(188, 47, 'To replace the Senate.', 0, '2026-06-04 17:16:45', '2026-06-04 17:16:45'),
(189, 48, 'No — questioning the police is illegal.', 0, '2026-06-04 17:16:45', '2026-06-04 17:16:45'),
(190, 48, 'Yes — the police are there to keep people safe and enforce the law, and you can question their conduct.', 1, '2026-06-04 17:16:45', '2026-06-04 17:16:45'),
(191, 48, 'Only with a written court order.', 0, '2026-06-04 17:16:45', '2026-06-04 17:16:45'),
(192, 48, 'Only if you are a lawyer.', 0, '2026-06-04 17:16:45', '2026-06-04 17:16:45'),
(193, 49, 'The Federal Court of Appeal.', 0, '2026-06-04 17:16:45', '2026-06-04 17:16:45'),
(194, 49, 'The Supreme Court of Canada.', 1, '2026-06-04 17:16:45', '2026-06-04 17:16:45'),
(195, 49, 'The Ontario Court of Appeal.', 0, '2026-06-04 17:16:45', '2026-06-04 17:16:45'),
(196, 49, 'The House of Commons.', 0, '2026-06-04 17:16:45', '2026-06-04 17:16:45'),
(197, 50, 'The Prime Minister is above the law.', 0, '2026-06-04 17:16:45', '2026-06-04 17:16:45'),
(198, 50, 'Everyone, including the police and government, is subject to the same laws.', 1, '2026-06-04 17:16:45', '2026-06-04 17:16:45'),
(199, 50, 'Only judges interpret the law.', 0, '2026-06-04 17:16:45', '2026-06-04 17:16:45'),
(200, 50, 'Citizens may obey only laws they agree with.', 0, '2026-06-04 17:16:45', '2026-06-04 17:16:45'),
(201, 51, 'Everyone charged with an offence.', 1, '2026-06-04 17:16:45', '2026-06-04 17:16:45'),
(202, 51, 'Only Canadian citizens.', 0, '2026-06-04 17:16:45', '2026-06-04 17:16:45'),
(203, 51, 'Only those who can afford a lawyer.', 0, '2026-06-04 17:16:45', '2026-06-04 17:16:45'),
(204, 51, 'Only first-time offenders.', 0, '2026-06-04 17:16:45', '2026-06-04 17:16:45'),
(205, 52, 'To remember our Sovereign, Queen Elizabeth II.', 0, '2026-06-04 17:16:45', '2026-06-04 17:16:45'),
(206, 52, 'To celebrate Confederation.', 0, '2026-06-04 17:16:45', '2026-06-04 17:16:45'),
(207, 52, 'To honour prime ministers who have died.', 0, '2026-06-04 17:16:45', '2026-06-04 17:16:45'),
(208, 52, 'To remember the sacrifice of Canadians who have served or died in wars up to the present day.', 1, '2026-06-04 17:16:45', '2026-06-04 17:16:45'),
(209, 53, 'The Order of Canada.', 0, '2026-06-04 17:16:45', '2026-06-04 17:16:45'),
(210, 53, 'The Victoria Cross (V.C.).', 1, '2026-06-04 17:16:45', '2026-06-04 17:16:45'),
(211, 53, 'The Order of Military Merit.', 0, '2026-06-04 17:16:45', '2026-06-04 17:16:45'),
(212, 53, 'The Maple Leaf Award.', 0, '2026-06-04 17:16:45', '2026-06-04 17:16:45'),
(213, 54, 'God Save the Queen.', 0, '2026-06-04 17:16:45', '2026-06-04 17:16:45'),
(214, 54, 'O Canada.', 1, '2026-06-04 17:16:45', '2026-06-04 17:16:45'),
(215, 54, 'The Maple Leaf Forever.', 0, '2026-06-04 17:16:45', '2026-06-04 17:16:45'),
(216, 54, 'Land of Hope and Glory.', 0, '2026-06-04 17:16:45', '2026-06-04 17:16:45'),
(217, 55, 'O Canada.', 0, '2026-06-04 17:16:45', '2026-06-04 17:16:45'),
(218, 55, 'God Save the Queen (or King).', 1, '2026-06-04 17:16:45', '2026-06-04 17:16:45'),
(219, 55, 'Rule, Britannia!', 0, '2026-06-04 17:16:45', '2026-06-04 17:16:45'),
(220, 55, 'The Maple Leaf Forever.', 0, '2026-06-04 17:16:45', '2026-06-04 17:16:45'),
(221, 56, 'The bald eagle and the Statue of Liberty.', 0, '2026-06-04 17:16:45', '2026-06-04 17:16:45'),
(222, 56, 'The Canadian flag (Maple Leaf) and the beaver.', 1, '2026-06-04 17:16:45', '2026-06-04 17:16:45'),
(223, 56, 'The cherry blossom and the kangaroo.', 0, '2026-06-04 17:16:45', '2026-06-04 17:16:45'),
(224, 56, 'The shamrock and the unicorn.', 0, '2026-06-04 17:16:45', '2026-06-04 17:16:45'),
(225, 57, 'It was chosen by Queen Victoria.', 0, '2026-06-04 17:16:45', '2026-06-04 17:16:45'),
(226, 57, 'It represents the fur trade that shaped Canada\'s early economy.', 1, '2026-06-04 17:16:45', '2026-06-04 17:16:45'),
(227, 57, 'It is the national animal of France.', 0, '2026-06-04 17:16:45', '2026-06-04 17:16:45'),
(228, 57, 'It is featured on the Canadian flag.', 0, '2026-06-04 17:16:45', '2026-06-04 17:16:45'),
(229, 58, 'Mining, fishing and farming.', 0, '2026-06-04 17:16:45', '2026-06-04 17:16:45'),
(230, 58, 'Service industries, manufacturing industries and natural resources industries.', 1, '2026-06-04 17:16:45', '2026-06-04 17:16:45'),
(231, 58, 'Banking, technology and tourism.', 0, '2026-06-04 17:16:45', '2026-06-04 17:16:45'),
(232, 58, 'Aerospace, forestry and oil.', 0, '2026-06-04 17:16:45', '2026-06-04 17:16:45'),
(233, 59, 'The United Kingdom.', 0, '2026-06-04 17:16:45', '2026-06-04 17:16:45'),
(234, 59, 'The United States.', 1, '2026-06-04 17:16:45', '2026-06-04 17:16:45'),
(235, 59, 'China.', 0, '2026-06-04 17:16:45', '2026-06-04 17:16:45'),
(236, 59, 'France.', 0, '2026-06-04 17:16:45', '2026-06-04 17:16:45'),
(237, 60, 'The Canadian pound.', 0, '2026-06-04 17:16:45', '2026-06-04 17:16:45'),
(238, 60, 'The Canadian dollar.', 1, '2026-06-04 17:16:45', '2026-06-04 17:16:45'),
(239, 60, 'The Canadian franc.', 0, '2026-06-04 17:16:45', '2026-06-04 17:16:45'),
(240, 60, 'The Canadian peso.', 0, '2026-06-04 17:16:45', '2026-06-04 17:16:45'),
(241, 61, 'Quebec and Ontario.', 0, '2026-06-04 17:16:45', '2026-06-04 17:16:45'),
(242, 61, 'Newfoundland and Labrador, Prince Edward Island, Nova Scotia, and New Brunswick.', 1, '2026-06-04 17:16:45', '2026-06-04 17:16:45'),
(243, 61, 'Manitoba, Saskatchewan, and Alberta.', 0, '2026-06-04 17:16:45', '2026-06-04 17:16:45'),
(244, 61, 'British Columbia and Yukon.', 0, '2026-06-04 17:16:45', '2026-06-04 17:16:45'),
(245, 62, 'British Columbia, Alberta, and Yukon.', 0, '2026-06-04 17:16:45', '2026-06-04 17:16:45'),
(246, 62, 'Manitoba, Saskatchewan, and Alberta.', 1, '2026-06-04 17:16:45', '2026-06-04 17:16:45'),
(247, 62, 'Ontario, Manitoba, and Saskatchewan.', 0, '2026-06-04 17:16:45', '2026-06-04 17:16:45'),
(248, 62, 'Alberta, Saskatchewan, and Northwest Territories.', 0, '2026-06-04 17:16:45', '2026-06-04 17:16:45'),
(249, 63, 'Manitoba and Saskatchewan.', 0, '2026-06-04 17:16:45', '2026-06-04 17:16:45'),
(250, 63, 'Quebec and Ontario.', 1, '2026-06-04 17:16:45', '2026-06-04 17:16:45'),
(251, 63, 'Nova Scotia and New Brunswick.', 0, '2026-06-04 17:16:45', '2026-06-04 17:16:45'),
(252, 63, 'British Columbia and Alberta.', 0, '2026-06-04 17:16:45', '2026-06-04 17:16:45'),
(253, 64, 'Yukon, Northwest Territories, and Nunavut.', 1, '2026-06-04 17:16:45', '2026-06-04 17:16:45'),
(254, 64, 'Newfoundland, Labrador, and Nunavut.', 0, '2026-06-04 17:16:45', '2026-06-04 17:16:45'),
(255, 64, 'Yukon, Alaska, and Greenland.', 0, '2026-06-04 17:16:45', '2026-06-04 17:16:45'),
(256, 64, 'Quebec, Manitoba, and Yukon.', 0, '2026-06-04 17:16:45', '2026-06-04 17:16:45'),
(257, 65, 'Toronto.', 0, '2026-06-04 17:16:45', '2026-06-04 17:16:45'),
(258, 65, 'Montreal.', 0, '2026-06-04 17:16:45', '2026-06-04 17:16:45'),
(259, 65, 'Ottawa.', 1, '2026-06-04 17:16:45', '2026-06-04 17:16:45'),
(260, 65, 'Vancouver.', 0, '2026-06-04 17:16:45', '2026-06-04 17:16:45'),
(261, 66, 'Vancouver.', 0, '2026-06-04 17:16:45', '2026-06-04 17:16:45'),
(262, 66, 'Victoria.', 1, '2026-06-04 17:16:45', '2026-06-04 17:16:45'),
(263, 66, 'Kelowna.', 0, '2026-06-04 17:16:45', '2026-06-04 17:16:45'),
(264, 66, 'Surrey.', 0, '2026-06-04 17:16:45', '2026-06-04 17:16:45'),
(265, 67, '10 provinces and 3 territories.', 1, '2026-06-04 17:16:45', '2026-06-04 17:16:45'),
(266, 67, '13 provinces and 0 territories.', 0, '2026-06-04 17:16:45', '2026-06-04 17:16:45'),
(267, 67, '12 provinces and 1 territory.', 0, '2026-06-04 17:16:45', '2026-06-04 17:16:45'),
(268, 67, '10 provinces and 5 territories.', 0, '2026-06-04 17:16:45', '2026-06-04 17:16:45'),
(269, 68, '1949.', 0, '2026-06-04 17:16:45', '2026-06-04 17:16:45'),
(270, 68, '1982.', 0, '2026-06-04 17:16:45', '2026-06-04 17:16:45'),
(271, 68, '1999.', 1, '2026-06-04 17:16:45', '2026-06-04 17:16:45'),
(272, 68, '2005.', 0, '2026-06-04 17:16:45', '2026-06-04 17:16:45'),
(273, 69, 'An oral interview only.', 0, '2026-06-04 17:16:45', '2026-06-04 17:16:45'),
(274, 69, 'A written test, but it could be an interview.', 1, '2026-06-04 17:16:45', '2026-06-04 17:16:45'),
(275, 69, 'A take-home essay.', 0, '2026-06-04 17:16:45', '2026-06-04 17:16:45'),
(276, 69, 'A multiple-day exam.', 0, '2026-06-04 17:16:45', '2026-06-04 17:16:45'),
(277, 70, '45 and over.', 0, '2026-06-04 17:16:45', '2026-06-04 17:16:45'),
(278, 70, '50 and over.', 0, '2026-06-04 17:16:45', '2026-06-04 17:16:45'),
(279, 70, '55 and over.', 1, '2026-06-04 17:16:45', '2026-06-04 17:16:45'),
(280, 70, '65 and over.', 0, '2026-06-04 17:16:45', '2026-06-04 17:16:45'),
(281, 71, 'You take an exam.', 0, '2026-06-04 17:16:45', '2026-06-04 17:16:45'),
(282, 71, 'You take the Oath of Citizenship, sign the oath form, and receive your Canadian Citizenship Certificate.', 1, '2026-06-04 17:16:45', '2026-06-04 17:16:45'),
(283, 71, 'You apply for a passport.', 0, '2026-06-04 17:16:45', '2026-06-04 17:16:45'),
(284, 71, 'You vote in a federal election.', 0, '2026-06-04 17:16:45', '2026-06-04 17:16:45'),
(285, 72, '10 out of 20 (50%).', 0, '2026-06-04 17:16:45', '2026-06-04 17:16:45'),
(286, 72, '12 out of 20 (60%).', 0, '2026-06-04 17:16:45', '2026-06-04 17:16:45'),
(287, 72, '15 out of 20 (75%).', 1, '2026-06-04 17:16:45', '2026-06-04 17:16:45'),
(288, 72, '18 out of 20 (90%).', 0, '2026-06-04 17:16:45', '2026-06-04 17:16:45'),
(289, 73, 'Adequate knowledge of English or French.', 1, '2026-06-04 17:16:45', '2026-06-04 17:16:45'),
(290, 73, 'Ability to recite all provincial capitals from memory.', 0, '2026-06-04 17:16:45', '2026-06-04 17:16:45'),
(291, 73, 'Personal financial standing.', 0, '2026-06-04 17:16:45', '2026-06-04 17:16:45'),
(292, 73, 'Membership in a Canadian political party.', 0, '2026-06-04 17:16:45', '2026-06-04 17:16:45'),
(293, 74, 'The Constitution Act, 1867.', 0, '2026-06-04 17:16:45', '2026-06-04 17:16:45'),
(294, 74, 'Magna Carta (1215).', 1, '2026-06-04 17:16:45', '2026-06-04 17:16:45'),
(295, 74, 'The Treaty of Paris (1763).', 0, '2026-06-04 17:16:45', '2026-06-04 17:16:45'),
(296, 74, 'The Statute of Westminster (1931).', 0, '2026-06-04 17:16:45', '2026-06-04 17:16:45'),
(297, 75, 'At least every two years.', 0, '2026-06-04 17:16:45', '2026-06-04 17:16:45'),
(298, 75, 'At least every five years.', 1, '2026-06-04 17:16:45', '2026-06-04 17:16:45'),
(299, 75, 'At least every ten years.', 0, '2026-06-04 17:16:45', '2026-06-04 17:16:45'),
(300, 75, 'Only when the Prime Minister decides.', 0, '2026-06-04 17:16:45', '2026-06-04 17:16:45'),
(301, 76, 'Yes — all citizens must serve at age 18.', 0, '2026-06-04 17:16:45', '2026-06-04 17:16:45'),
(302, 76, 'Yes — only male citizens must serve.', 0, '2026-06-04 17:16:45', '2026-06-04 17:16:45'),
(303, 76, 'No — service is voluntary, but seen as a noble way to contribute.', 1, '2026-06-04 17:16:45', '2026-06-04 17:16:45'),
(304, 76, 'No — citizens are forbidden from serving.', 0, '2026-06-04 17:16:45', '2026-06-04 17:16:45'),
(305, 77, 'Only those of First Nations.', 0, '2026-06-04 17:16:45', '2026-06-04 17:16:45'),
(306, 77, 'First Nations, Métis and Inuit peoples.', 1, '2026-06-04 17:16:45', '2026-06-04 17:16:45'),
(307, 77, 'Only Métis on the Prairies.', 0, '2026-06-04 17:16:45', '2026-06-04 17:16:45'),
(308, 77, 'Only Inuit in Nunavut.', 0, '2026-06-04 17:16:45', '2026-06-04 17:16:45'),
(309, 78, 'The Prime Minister makes the laws alone.', 0, '2026-06-04 17:16:45', '2026-06-04 17:16:45'),
(310, 78, 'The law applies equally to everyone, including governments and the police.', 1, '2026-06-04 17:16:45', '2026-06-04 17:16:45'),
(311, 78, 'Only judges are bound by the law.', 0, '2026-06-04 17:16:45', '2026-06-04 17:16:45'),
(312, 78, 'Citizens may choose which laws to obey.', 0, '2026-06-04 17:16:45', '2026-06-04 17:16:45'),
(313, 79, 'Inuktitut.', 0, '2026-06-04 17:16:45', '2026-06-04 17:16:45'),
(314, 79, 'Cree.', 0, '2026-06-04 17:16:45', '2026-06-04 17:16:45'),
(315, 79, 'Michif.', 1, '2026-06-04 17:16:45', '2026-06-04 17:16:45'),
(316, 79, 'Joual.', 0, '2026-06-04 17:16:45', '2026-06-04 17:16:45'),
(317, 80, '1982.', 0, '2026-06-04 17:16:45', '2026-06-04 17:16:45'),
(318, 80, '1996.', 0, '2026-06-04 17:16:45', '2026-06-04 17:16:45'),
(319, 80, '2008.', 1, '2026-06-04 17:16:45', '2026-06-04 17:16:45'),
(320, 80, '2015.', 0, '2026-06-04 17:16:45', '2026-06-04 17:16:45'),
(321, 81, 'About one third.', 0, '2026-06-04 17:16:45', '2026-06-04 17:16:45'),
(322, 81, 'About half.', 0, '2026-06-04 17:16:45', '2026-06-04 17:16:45'),
(323, 81, 'About two thirds (around 65%).', 1, '2026-06-04 17:16:45', '2026-06-04 17:16:45'),
(324, 81, 'Over 90%.', 0, '2026-06-04 17:16:45', '2026-06-04 17:16:45'),
(325, 82, 'On the Prairies.', 0, '2026-06-04 17:16:45', '2026-06-04 17:16:45'),
(326, 82, 'In small, scattered communities across the Arctic.', 1, '2026-06-04 17:16:45', '2026-06-04 17:16:45'),
(327, 82, 'In the Maritime provinces.', 0, '2026-06-04 17:16:45', '2026-06-04 17:16:45'),
(328, 82, 'In Southern Ontario.', 0, '2026-06-04 17:16:45', '2026-06-04 17:16:45'),
(329, 83, 'About 1 million.', 0, '2026-06-04 17:16:45', '2026-06-04 17:16:45'),
(330, 83, 'About 4 million.', 0, '2026-06-04 17:16:45', '2026-06-04 17:16:45'),
(331, 83, 'About 7 million.', 1, '2026-06-04 17:16:45', '2026-06-04 17:16:45'),
(332, 83, 'About 18 million.', 0, '2026-06-04 17:16:45', '2026-06-04 17:16:45'),
(333, 84, 'About 7 million.', 0, '2026-06-04 17:16:45', '2026-06-04 17:16:45'),
(334, 84, 'About 12 million.', 0, '2026-06-04 17:16:45', '2026-06-04 17:16:45'),
(335, 84, 'About 18 million.', 1, '2026-06-04 17:16:45', '2026-06-04 17:16:45'),
(336, 84, 'About 25 million.', 0, '2026-06-04 17:16:45', '2026-06-04 17:16:45'),
(337, 85, 'The Spanish.', 0, '2026-06-04 17:16:45', '2026-06-04 17:16:45'),
(338, 85, 'The Norse Vikings.', 1, '2026-06-04 17:16:45', '2026-06-04 17:16:45'),
(339, 85, 'The Portuguese.', 0, '2026-06-04 17:16:45', '2026-06-04 17:16:45'),
(340, 85, 'The Dutch.', 0, '2026-06-04 17:16:45', '2026-06-04 17:16:45'),
(341, 86, 'Jacques Cartier.', 0, '2026-06-04 17:16:45', '2026-06-04 17:16:45'),
(342, 86, 'John Cabot.', 1, '2026-06-04 17:16:45', '2026-06-04 17:16:45'),
(343, 86, 'Henry Hudson.', 0, '2026-06-04 17:16:45', '2026-06-04 17:16:45'),
(344, 86, 'Samuel de Champlain.', 0, '2026-06-04 17:16:45', '2026-06-04 17:16:45'),
(345, 87, '1608.', 0, '2026-06-04 17:16:45', '2026-06-04 17:16:45'),
(346, 87, '1663.', 1, '2026-06-04 17:16:45', '2026-06-04 17:16:45'),
(347, 87, '1670.', 0, '2026-06-04 17:16:45', '2026-06-04 17:16:45'),
(348, 87, '1759.', 0, '2026-06-04 17:16:45', '2026-06-04 17:16:45'),
(349, 88, 'Wolfe (British) and Montcalm (French).', 1, '2026-06-04 17:16:45', '2026-06-04 17:16:45'),
(350, 88, 'Brock (British) and Tecumseh (Shawnee).', 0, '2026-06-04 17:16:45', '2026-06-04 17:16:45'),
(351, 88, 'Carleton (British) and Laval (French).', 0, '2026-06-04 17:16:45', '2026-06-04 17:16:45'),
(352, 88, 'Macdonald (British) and Riel (Métis).', 0, '2026-06-04 17:16:45', '2026-06-04 17:16:45'),
(353, 89, 'Banned the French language in Quebec.', 0, '2026-06-04 17:16:45', '2026-06-04 17:16:45'),
(354, 89, 'Allowed religious freedom for Catholics and restored French civil law.', 1, '2026-06-04 17:16:45', '2026-06-04 17:16:45'),
(355, 89, 'Created the Province of Canada.', 0, '2026-06-04 17:16:45', '2026-06-04 17:16:45'),
(356, 89, 'Brought Confederation to Canada.', 0, '2026-06-04 17:16:45', '2026-06-04 17:16:45'),
(357, 90, 'British soldiers who refused to fight at Quebec.', 0, '2026-06-04 17:16:45', '2026-06-04 17:16:45'),
(358, 90, 'Settlers who came to Canada from France after the British conquest.', 0, '2026-06-04 17:16:45', '2026-06-04 17:16:45'),
(359, 90, 'Americans loyal to the Crown who fled to Canada during and after the American Revolution.', 1, '2026-06-04 17:16:45', '2026-06-04 17:16:45'),
(360, 90, 'Members of the United Empire of the Hudson\'s Bay Company.', 0, '2026-06-04 17:16:45', '2026-06-04 17:16:45'),
(361, 91, 'Laura Secord.', 1, '2026-06-04 17:16:45', '2026-06-04 17:16:45'),
(362, 91, 'Nellie McClung.', 0, '2026-06-04 17:16:45', '2026-06-04 17:16:45'),
(363, 91, 'Emily Carr.', 0, '2026-06-04 17:16:45', '2026-06-04 17:16:45'),
(364, 91, 'Madeleine de Verchères.', 0, '2026-06-04 17:16:45', '2026-06-04 17:16:45'),
(365, 92, 'The $5 bill.', 0, '2026-06-04 17:16:45', '2026-06-04 17:16:45'),
(366, 92, 'The $10 bill.', 1, '2026-06-04 17:16:45', '2026-06-04 17:16:45'),
(367, 92, 'The $20 bill.', 0, '2026-06-04 17:16:45', '2026-06-04 17:16:45'),
(368, 92, 'The $50 bill.', 0, '2026-06-04 17:16:45', '2026-06-04 17:16:45'),
(369, 93, 'The $5 bill.', 1, '2026-06-04 17:16:45', '2026-06-04 17:16:45'),
(370, 93, 'The $10 bill.', 0, '2026-06-04 17:16:45', '2026-06-04 17:16:45'),
(371, 93, 'The $20 bill.', 0, '2026-06-04 17:16:45', '2026-06-04 17:16:45'),
(372, 93, 'The $100 bill.', 0, '2026-06-04 17:16:45', '2026-06-04 17:16:45'),
(373, 94, '1867.', 0, '2026-06-04 17:16:45', '2026-06-04 17:16:45'),
(374, 94, '1905.', 0, '2026-06-04 17:16:45', '2026-06-04 17:16:45'),
(375, 94, '1931.', 0, '2026-06-04 17:16:45', '2026-06-04 17:16:45'),
(376, 94, '1949.', 1, '2026-06-04 17:16:45', '2026-06-04 17:16:45'),
(377, 95, 'Created the Province of Quebec.', 0, '2026-06-04 17:16:45', '2026-06-04 17:16:45'),
(378, 95, 'Made Canada legally autonomous from Britain, except for amending the Constitution.', 1, '2026-06-04 17:16:45', '2026-06-04 17:16:45'),
(379, 95, 'Abolished the monarchy in Canada.', 0, '2026-06-04 17:16:45', '2026-06-04 17:16:45'),
(380, 95, 'Joined Newfoundland to Canada.', 0, '2026-06-04 17:16:45', '2026-06-04 17:16:45'),
(381, 96, 'World War II.', 0, '2026-06-04 17:16:45', '2026-06-04 17:16:45'),
(382, 96, 'The Suez Crisis.', 0, '2026-06-04 17:16:45', '2026-06-04 17:16:45'),
(383, 96, 'The Korean War.', 1, '2026-06-04 17:16:45', '2026-06-04 17:16:45'),
(384, 96, 'The Vietnam War.', 0, '2026-06-04 17:16:45', '2026-06-04 17:16:45'),
(385, 97, 'General Sir Arthur Currie.', 1, '2026-06-04 17:16:45', '2026-06-04 17:16:45'),
(386, 97, 'General Sir Isaac Brock.', 0, '2026-06-04 17:16:45', '2026-06-04 17:16:45'),
(387, 97, 'General Wolfe.', 0, '2026-06-04 17:16:45', '2026-06-04 17:16:45'),
(388, 97, 'General Sam Hughes.', 0, '2026-06-04 17:16:45', '2026-06-04 17:16:45'),
(389, 98, '1971.', 0, '2026-06-04 17:16:45', '2026-06-04 17:16:45'),
(390, 98, '1982.', 0, '2026-06-04 17:16:45', '2026-06-04 17:16:45'),
(391, 98, '1988.', 1, '2026-06-04 17:16:45', '2026-06-04 17:16:45'),
(392, 98, '1999.', 0, '2026-06-04 17:16:45', '2026-06-04 17:16:45'),
(393, 99, '1918.', 0, '2026-06-04 17:16:45', '2026-06-04 17:16:45'),
(394, 99, '1949.', 0, '2026-06-04 17:16:45', '2026-06-04 17:16:45'),
(395, 99, '1960.', 1, '2026-06-04 17:16:45', '2026-06-04 17:16:45'),
(396, 99, '1982.', 0, '2026-06-04 17:16:45', '2026-06-04 17:16:45'),
(397, 100, '1867.', 0, '2026-06-04 17:16:45', '2026-06-04 17:16:45'),
(398, 100, '1949.', 0, '2026-06-04 17:16:45', '2026-06-04 17:16:45'),
(399, 100, '1969.', 1, '2026-06-04 17:16:45', '2026-06-04 17:16:45'),
(400, 100, '1982.', 0, '2026-06-04 17:16:45', '2026-06-04 17:16:45'),
(401, 101, '1980.', 0, '2026-06-04 17:16:45', '2026-06-04 17:16:45'),
(402, 101, '1982.', 0, '2026-06-04 17:16:45', '2026-06-04 17:16:45'),
(403, 101, '1992.', 0, '2026-06-04 17:16:45', '2026-06-04 17:16:45'),
(404, 101, '1995.', 1, '2026-06-04 17:16:45', '2026-06-04 17:16:45'),
(405, 102, 'July 1.', 0, '2026-06-04 17:16:45', '2026-06-04 17:16:45'),
(406, 102, 'February 15.', 1, '2026-06-04 17:16:45', '2026-06-04 17:16:45'),
(407, 102, 'November 11.', 0, '2026-06-04 17:16:45', '2026-06-04 17:16:45'),
(408, 102, 'September 17.', 0, '2026-06-04 17:16:45', '2026-06-04 17:16:45'),
(409, 103, 'Education.', 0, '2026-06-04 17:16:45', '2026-06-04 17:16:45'),
(410, 103, 'Healthcare delivery.', 0, '2026-06-04 17:16:45', '2026-06-04 17:16:45'),
(411, 103, 'National defence, foreign policy and citizenship.', 1, '2026-06-04 17:16:45', '2026-06-04 17:16:45'),
(412, 103, 'Property and civil rights.', 0, '2026-06-04 17:16:45', '2026-06-04 17:16:45'),
(413, 104, 'Foreign policy.', 0, '2026-06-04 17:16:45', '2026-06-04 17:16:45'),
(414, 104, 'National defence.', 0, '2026-06-04 17:16:45', '2026-06-04 17:16:45'),
(415, 104, 'Education and healthcare.', 1, '2026-06-04 17:16:45', '2026-06-04 17:16:45'),
(416, 104, 'Currency.', 0, '2026-06-04 17:16:45', '2026-06-04 17:16:45'),
(417, 105, 'The Premier.', 0, '2026-06-04 17:16:45', '2026-06-04 17:16:45'),
(418, 105, 'The Lieutenant Governor.', 1, '2026-06-04 17:16:45', '2026-06-04 17:16:45'),
(419, 105, 'The Speaker of the Legislative Assembly.', 0, '2026-06-04 17:16:45', '2026-06-04 17:16:45'),
(420, 105, 'The Chief Justice.', 0, '2026-06-04 17:16:45', '2026-06-04 17:16:45'),
(421, 106, 'Prime Minister.', 0, '2026-06-04 17:16:45', '2026-06-04 17:16:45'),
(422, 106, 'Premier.', 1, '2026-06-04 17:16:45', '2026-06-04 17:16:45'),
(423, 106, 'Mayor.', 0, '2026-06-04 17:16:45', '2026-06-04 17:16:45'),
(424, 106, 'Governor.', 0, '2026-06-04 17:16:45', '2026-06-04 17:16:45'),
(425, 107, '65.', 0, '2026-06-04 17:16:45', '2026-06-04 17:16:45'),
(426, 107, '70.', 0, '2026-06-04 17:16:45', '2026-06-04 17:16:45'),
(427, 107, '75.', 1, '2026-06-04 17:16:45', '2026-06-04 17:16:45'),
(428, 107, '80.', 0, '2026-06-04 17:16:45', '2026-06-04 17:16:45'),
(429, 108, 'The Governor General.', 0, '2026-06-04 17:16:45', '2026-06-04 17:16:45'),
(430, 108, 'The Senate.', 0, '2026-06-04 17:16:45', '2026-06-04 17:16:45'),
(431, 108, 'The Prime Minister.', 1, '2026-06-04 17:16:45', '2026-06-04 17:16:45'),
(432, 108, 'The Supreme Court.', 0, '2026-06-04 17:16:45', '2026-06-04 17:16:45'),
(433, 109, 'A ward.', 0, '2026-06-04 17:16:45', '2026-06-04 17:16:45'),
(434, 109, 'A riding (constituency).', 1, '2026-06-04 17:16:45', '2026-06-04 17:16:45'),
(435, 109, 'A canton.', 0, '2026-06-04 17:16:45', '2026-06-04 17:16:45'),
(436, 109, 'A precinct.', 0, '2026-06-04 17:16:45', '2026-06-04 17:16:45'),
(437, 110, 'Your identity and your address.', 1, '2026-06-04 17:16:45', '2026-06-04 17:16:45'),
(438, 110, 'Your income for the past year.', 0, '2026-06-04 17:16:45', '2026-06-04 17:16:45'),
(439, 110, 'Your party membership.', 0, '2026-06-04 17:16:45', '2026-06-04 17:16:45'),
(440, 110, 'Your country of origin.', 0, '2026-06-04 17:16:45', '2026-06-04 17:16:45'),
(441, 111, 'MPs (Members of Parliament).', 0, '2026-06-04 17:16:45', '2026-06-04 17:16:45'),
(442, 111, 'MLAs (Members of the Legislative Assembly).', 0, '2026-06-04 17:16:45', '2026-06-04 17:16:45'),
(443, 111, 'MNAs (Members of the National Assembly).', 1, '2026-06-04 17:16:45', '2026-06-04 17:16:45'),
(444, 111, 'MPPs (Members of Provincial Parliament).', 0, '2026-06-04 17:16:45', '2026-06-04 17:16:45'),
(445, 112, 'MPs.', 0, '2026-06-04 17:16:45', '2026-06-04 17:16:45'),
(446, 112, 'MPPs (Members of Provincial Parliament).', 1, '2026-06-04 17:16:45', '2026-06-04 17:16:45'),
(447, 112, 'MLAs.', 0, '2026-06-04 17:16:45', '2026-06-04 17:16:45'),
(448, 112, 'MNAs.', 0, '2026-06-04 17:16:45', '2026-06-04 17:16:45'),
(449, 113, 'The Prime Minister.', 0, '2026-06-04 17:16:45', '2026-06-04 17:16:45'),
(450, 113, 'Senators.', 0, '2026-06-04 17:16:45', '2026-06-04 17:16:45'),
(451, 113, 'Mayors and councillors.', 1, '2026-06-04 17:16:45', '2026-06-04 17:16:45'),
(452, 113, 'Lieutenant Governors.', 0, '2026-06-04 17:16:45', '2026-06-04 17:16:45'),
(453, 114, 'To remain silent and to retain a lawyer (and have one without charge if you cannot afford one through legal aid).', 1, '2026-06-04 17:16:45', '2026-06-04 17:16:45'),
(454, 114, 'To be released within 24 hours, no matter the charge.', 0, '2026-06-04 17:16:45', '2026-06-04 17:16:45'),
(455, 114, 'To represent yourself only.', 0, '2026-06-04 17:16:45', '2026-06-04 17:16:45'),
(456, 114, 'To be tried within 30 days, automatically.', 0, '2026-06-04 17:16:45', '2026-06-04 17:16:45'),
(457, 115, 'Royal Canadian Military Police.', 0, '2026-06-04 17:16:45', '2026-06-04 17:16:45'),
(458, 115, 'Royal Canadian Mounted Police.', 1, '2026-06-04 17:16:45', '2026-06-04 17:16:45'),
(459, 115, 'Royal Crown Municipal Police.', 0, '2026-06-04 17:16:45', '2026-06-04 17:16:45'),
(460, 115, 'Regional Canadian Marine Patrol.', 0, '2026-06-04 17:16:45', '2026-06-04 17:16:45'),
(461, 116, 'Ontario and Quebec.', 1, '2026-06-04 17:16:45', '2026-06-04 17:16:45'),
(462, 116, 'Alberta and British Columbia.', 0, '2026-06-04 17:16:45', '2026-06-04 17:16:45'),
(463, 116, 'Manitoba and Saskatchewan.', 0, '2026-06-04 17:16:45', '2026-06-04 17:16:45'),
(464, 116, 'Nova Scotia and New Brunswick.', 0, '2026-06-04 17:16:45', '2026-06-04 17:16:45'),
(465, 117, 'July 1, 1867.', 0, '2026-06-04 17:16:45', '2026-06-04 17:16:45'),
(466, 117, 'February 15, 1965.', 1, '2026-06-04 17:16:45', '2026-06-04 17:16:45'),
(467, 117, 'April 9, 1917.', 0, '2026-06-04 17:16:45', '2026-06-04 17:16:45'),
(468, 117, 'November 11, 1918.', 0, '2026-06-04 17:16:45', '2026-06-04 17:16:45'),
(469, 118, 'Canada\'s parliamentary democracy and government.', 1, '2026-06-04 17:16:45', '2026-06-04 17:16:45'),
(470, 118, 'Independence from Britain.', 0, '2026-06-04 17:16:45', '2026-06-04 17:16:45'),
(471, 118, 'The federal court system.', 0, '2026-06-04 17:16:45', '2026-06-04 17:16:45'),
(472, 118, 'The Canadian Forces.', 0, '2026-06-04 17:16:45', '2026-06-04 17:16:45'),
(473, 119, 'E pluribus unum.', 0, '2026-06-04 17:16:45', '2026-06-04 17:16:45'),
(474, 119, 'A mari usque ad mare (From sea to sea).', 1, '2026-06-04 17:16:45', '2026-06-04 17:16:45'),
(475, 119, 'Peace, order and good government.', 0, '2026-06-04 17:16:45', '2026-06-04 17:16:45'),
(476, 119, 'Je me souviens.', 0, '2026-06-04 17:16:45', '2026-06-04 17:16:45'),
(477, 120, 'Calixa Lavallée.', 1, '2026-06-04 17:16:45', '2026-06-04 17:16:45'),
(478, 120, 'Adolphe-Basile Routhier.', 0, '2026-06-04 17:16:45', '2026-06-04 17:16:45'),
(479, 120, 'Robert Stanley Weir.', 0, '2026-06-04 17:16:45', '2026-06-04 17:16:45'),
(480, 120, 'Glenn Gould.', 0, '2026-06-04 17:16:45', '2026-06-04 17:16:45'),
(481, 121, '1880.', 0, '2026-06-04 17:16:45', '2026-06-04 17:16:45'),
(482, 121, '1908.', 0, '2026-06-04 17:16:45', '2026-06-04 17:16:45'),
(483, 121, '1965.', 0, '2026-06-04 17:16:45', '2026-06-04 17:16:45'),
(484, 121, '1980.', 1, '2026-06-04 17:16:45', '2026-06-04 17:16:45'),
(485, 122, 'Curling.', 0, '2026-06-04 17:16:45', '2026-06-04 17:16:45'),
(486, 122, 'Hockey.', 1, '2026-06-04 17:16:45', '2026-06-04 17:16:45'),
(487, 122, 'Skiing.', 0, '2026-06-04 17:16:45', '2026-06-04 17:16:45'),
(488, 122, 'Lacrosse.', 0, '2026-06-04 17:16:45', '2026-06-04 17:16:45'),
(489, 123, 'Baseball.', 0, '2026-06-04 17:16:45', '2026-06-04 17:16:45'),
(490, 123, 'Soccer.', 0, '2026-06-04 17:16:45', '2026-06-04 17:16:45'),
(491, 123, 'Lacrosse.', 1, '2026-06-04 17:16:45', '2026-06-04 17:16:45'),
(492, 123, 'Rugby.', 0, '2026-06-04 17:16:45', '2026-06-04 17:16:45'),
(493, 124, 'July 1.', 0, '2026-06-04 17:16:45', '2026-06-04 17:16:45'),
(494, 124, 'September 17.', 0, '2026-06-04 17:16:45', '2026-06-04 17:16:45'),
(495, 124, 'November 11.', 1, '2026-06-04 17:16:45', '2026-06-04 17:16:45'),
(496, 124, 'December 6.', 0, '2026-06-04 17:16:45', '2026-06-04 17:16:45'),
(497, 125, '1949.', 0, '2026-06-04 17:16:45', '2026-06-04 17:16:45'),
(498, 125, '1967.', 1, '2026-06-04 17:16:45', '2026-06-04 17:16:45'),
(499, 125, '1982.', 0, '2026-06-04 17:16:45', '2026-06-04 17:16:45'),
(500, 125, '1999.', 0, '2026-06-04 17:16:45', '2026-06-04 17:16:45'),
(501, 126, 'The Bank of Canada.', 0, '2026-06-04 17:16:45', '2026-06-04 17:16:45'),
(502, 126, 'The Royal Canadian Mint.', 1, '2026-06-04 17:16:45', '2026-06-04 17:16:45'),
(503, 126, 'The Toronto Stock Exchange.', 0, '2026-06-04 17:16:45', '2026-06-04 17:16:45'),
(504, 126, 'The Department of Finance.', 0, '2026-06-04 17:16:45', '2026-06-04 17:16:45'),
(505, 127, 'The Royal Bank of Canada.', 0, '2026-06-04 17:16:45', '2026-06-04 17:16:45'),
(506, 127, 'The Bank of Montreal.', 0, '2026-06-04 17:16:45', '2026-06-04 17:16:45'),
(507, 127, 'The Bank of Canada.', 1, '2026-06-04 17:16:45', '2026-06-04 17:16:45'),
(508, 127, 'The Federal Reserve of Canada.', 0, '2026-06-04 17:16:45', '2026-06-04 17:16:45'),
(509, 128, 'The G7.', 1, '2026-06-04 17:16:45', '2026-06-04 17:16:45'),
(510, 128, 'ASEAN.', 0, '2026-06-04 17:16:45', '2026-06-04 17:16:45'),
(511, 128, 'Mercosur.', 0, '2026-06-04 17:16:45', '2026-06-04 17:16:45'),
(512, 128, 'OPEC.', 0, '2026-06-04 17:16:45', '2026-06-04 17:16:45'),
(513, 129, 'Natural resources.', 0, '2026-06-04 17:16:45', '2026-06-04 17:16:45'),
(514, 129, 'Manufacturing.', 0, '2026-06-04 17:16:45', '2026-06-04 17:16:45'),
(515, 129, 'Service industries.', 1, '2026-06-04 17:16:45', '2026-06-04 17:16:45'),
(516, 129, 'Agriculture.', 0, '2026-06-04 17:16:45', '2026-06-04 17:16:45'),
(517, 130, 'Charlottetown.', 0, '2026-06-04 17:16:45', '2026-06-04 17:16:45'),
(518, 130, 'Halifax.', 0, '2026-06-04 17:16:45', '2026-06-04 17:16:45'),
(519, 130, 'St. John\'s.', 1, '2026-06-04 17:16:45', '2026-06-04 17:16:45'),
(520, 130, 'Fredericton.', 0, '2026-06-04 17:16:45', '2026-06-04 17:16:45'),
(521, 131, 'Summerside.', 0, '2026-06-04 17:16:45', '2026-06-04 17:16:45'),
(522, 131, 'Charlottetown.', 1, '2026-06-04 17:16:45', '2026-06-04 17:16:45'),
(523, 131, 'Halifax.', 0, '2026-06-04 17:16:45', '2026-06-04 17:16:45'),
(524, 131, 'Saint John.', 0, '2026-06-04 17:16:45', '2026-06-04 17:16:45'),
(525, 132, 'Sydney.', 0, '2026-06-04 17:16:45', '2026-06-04 17:16:45'),
(526, 132, 'Halifax.', 1, '2026-06-04 17:16:45', '2026-06-04 17:16:45'),
(527, 132, 'Yarmouth.', 0, '2026-06-04 17:16:45', '2026-06-04 17:16:45'),
(528, 132, 'Truro.', 0, '2026-06-04 17:16:45', '2026-06-04 17:16:45'),
(529, 133, 'Saint John.', 0, '2026-06-04 17:16:45', '2026-06-04 17:16:45'),
(530, 133, 'Moncton.', 0, '2026-06-04 17:16:45', '2026-06-04 17:16:45'),
(531, 133, 'Fredericton.', 1, '2026-06-04 17:16:45', '2026-06-04 17:16:45'),
(532, 133, 'Bathurst.', 0, '2026-06-04 17:16:45', '2026-06-04 17:16:45'),
(533, 134, 'Quebec.', 0, '2026-06-04 17:16:45', '2026-06-04 17:16:45'),
(534, 134, 'Nova Scotia.', 0, '2026-06-04 17:16:45', '2026-06-04 17:16:45'),
(535, 134, 'New Brunswick.', 1, '2026-06-04 17:16:45', '2026-06-04 17:16:45'),
(536, 134, 'Ontario.', 0, '2026-06-04 17:16:45', '2026-06-04 17:16:45'),
(537, 135, 'Montreal.', 0, '2026-06-04 17:16:45', '2026-06-04 17:16:45'),
(538, 135, 'Quebec City.', 1, '2026-06-04 17:16:45', '2026-06-04 17:16:45'),
(539, 135, 'Laval.', 0, '2026-06-04 17:16:45', '2026-06-04 17:16:45'),
(540, 135, 'Sherbrooke.', 0, '2026-06-04 17:16:45', '2026-06-04 17:16:45'),
(541, 136, 'Toronto.', 1, '2026-06-04 17:16:45', '2026-06-04 17:16:45'),
(542, 136, 'Ottawa.', 0, '2026-06-04 17:16:45', '2026-06-04 17:16:45'),
(543, 136, 'Hamilton.', 0, '2026-06-04 17:16:45', '2026-06-04 17:16:45'),
(544, 136, 'Kingston.', 0, '2026-06-04 17:16:45', '2026-06-04 17:16:45'),
(545, 137, 'Brandon.', 0, '2026-06-04 17:16:45', '2026-06-04 17:16:45'),
(546, 137, 'Winnipeg.', 1, '2026-06-04 17:16:45', '2026-06-04 17:16:45'),
(547, 137, 'Thompson.', 0, '2026-06-04 17:16:45', '2026-06-04 17:16:45'),
(548, 137, 'Steinbach.', 0, '2026-06-04 17:16:45', '2026-06-04 17:16:45'),
(549, 138, 'Saskatoon.', 0, '2026-06-04 17:16:45', '2026-06-04 17:16:45'),
(550, 138, 'Regina.', 1, '2026-06-04 17:16:45', '2026-06-04 17:16:45'),
(551, 138, 'Prince Albert.', 0, '2026-06-04 17:16:45', '2026-06-04 17:16:45'),
(552, 138, 'Moose Jaw.', 0, '2026-06-04 17:16:45', '2026-06-04 17:16:45'),
(553, 139, 'Calgary.', 0, '2026-06-04 17:16:45', '2026-06-04 17:16:45'),
(554, 139, 'Edmonton.', 1, '2026-06-04 17:16:45', '2026-06-04 17:16:45'),
(555, 139, 'Red Deer.', 0, '2026-06-04 17:16:45', '2026-06-04 17:16:45'),
(556, 139, 'Lethbridge.', 0, '2026-06-04 17:16:45', '2026-06-04 17:16:45'),
(557, 140, 'Dawson City.', 0, '2026-06-04 17:16:45', '2026-06-04 17:16:45'),
(558, 140, 'Whitehorse.', 1, '2026-06-04 17:16:45', '2026-06-04 17:16:45'),
(559, 140, 'Watson Lake.', 0, '2026-06-04 17:16:45', '2026-06-04 17:16:45'),
(560, 140, 'Faro.', 0, '2026-06-04 17:16:45', '2026-06-04 17:16:45'),
(561, 141, 'Inuvik.', 0, '2026-06-04 17:16:45', '2026-06-04 17:16:45'),
(562, 141, 'Hay River.', 0, '2026-06-04 17:16:45', '2026-06-04 17:16:45'),
(563, 141, 'Yellowknife.', 1, '2026-06-04 17:16:45', '2026-06-04 17:16:45'),
(564, 141, 'Fort Smith.', 0, '2026-06-04 17:16:45', '2026-06-04 17:16:45'),
(565, 142, 'Iqaluit.', 1, '2026-06-04 17:16:45', '2026-06-04 17:16:45'),
(566, 142, 'Rankin Inlet.', 0, '2026-06-04 17:16:45', '2026-06-04 17:16:45'),
(567, 142, 'Cambridge Bay.', 0, '2026-06-04 17:16:45', '2026-06-04 17:16:45'),
(568, 142, 'Arviat.', 0, '2026-06-04 17:16:45', '2026-06-04 17:16:45'),
(569, 143, 'Port of Halifax.', 0, '2026-06-04 17:16:45', '2026-06-04 17:16:45'),
(570, 143, 'Port of Montreal.', 0, '2026-06-04 17:16:45', '2026-06-04 17:16:45'),
(571, 143, 'Port of Vancouver.', 1, '2026-06-04 17:16:45', '2026-06-04 17:16:45'),
(572, 143, 'Port of Saint John.', 0, '2026-06-04 17:16:45', '2026-06-04 17:16:45'),
(573, 144, 'Quebec City.', 1, '2026-06-04 17:16:45', '2026-06-04 17:16:45');
INSERT INTO `practice_question_options` (`id`, `question_id`, `option_text`, `is_correct`, `created_at`, `updated_at`) VALUES
(574, 144, 'Montreal.', 0, '2026-06-04 17:16:45', '2026-06-04 17:16:45'),
(575, 144, 'Halifax.', 0, '2026-06-04 17:16:45', '2026-06-04 17:16:45'),
(576, 144, 'Kingston.', 0, '2026-06-04 17:16:45', '2026-06-04 17:16:45'),
(577, 145, 'Queen Victoria.', 1, '2026-06-04 17:16:45', '2026-06-04 17:16:45'),
(578, 145, 'Sir John A. Macdonald.', 0, '2026-06-04 17:16:45', '2026-06-04 17:16:45'),
(579, 145, 'Lord Durham.', 0, '2026-06-04 17:16:45', '2026-06-04 17:16:45'),
(580, 145, 'Queen Elizabeth II.', 0, '2026-06-04 17:16:45', '2026-06-04 17:16:45'),
(589, 148, 'Being loyal to Canada, recycling newspapers, serving in the navy, army or air force.', 0, '2026-06-04 21:49:22', '2026-06-04 21:49:22'),
(590, 148, 'Obeying the law, taking responsibility for oneself and one\'s family, serving on a jury.', 1, '2026-06-04 21:49:22', '2026-06-04 21:49:22'),
(591, 148, 'Learning both official languages, voting in elections, belonging to a union.', 0, '2026-06-04 21:49:22', '2026-06-04 21:49:22'),
(592, 148, 'Buying Canadian products, owning your own business, using less water.', 0, '2026-06-04 21:49:22', '2026-06-04 21:49:22');

-- --------------------------------------------------------

--
-- Table structure for table `practice_sessions`
--

CREATE TABLE `practice_sessions` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `chapter_id` int(11) DEFAULT NULL,
  `total_questions` int(11) NOT NULL DEFAULT 0,
  `correct_answers` int(11) NOT NULL DEFAULT 0,
  `wrong_answers` int(11) NOT NULL DEFAULT 0,
  `score` decimal(5,2) NOT NULL DEFAULT 0.00,
  `completed_at` datetime DEFAULT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `practice_sessions`
--

INSERT INTO `practice_sessions` (`id`, `user_id`, `chapter_id`, `total_questions`, `correct_answers`, `wrong_answers`, `score`, `completed_at`, `created_at`, `updated_at`) VALUES
(6, 13, 1, 5, 2, 3, 40.00, '2026-06-04 05:25:08', '2026-06-04 11:25:08', '2026-06-04 11:25:08'),
(7, 13, 2, 10, 6, 4, 60.00, '2026-06-04 05:33:06', '2026-06-04 11:33:06', '2026-06-04 11:33:06'),
(8, 13, 4, 10, 7, 3, 70.00, '2026-06-04 05:38:59', '2026-06-04 11:38:59', '2026-06-04 11:38:59'),
(9, 13, 8, 8, 5, 3, 63.00, '2026-06-04 05:40:04', '2026-06-04 11:40:04', '2026-06-04 11:40:04'),
(10, 13, 8, 8, 5, 3, 63.00, '2026-06-04 05:40:54', '2026-06-04 11:40:54', '2026-06-04 11:40:54'),
(11, 11, 13, 1, 1, 0, 100.00, '2026-06-04 07:12:15', '2026-06-04 13:12:15', '2026-06-04 13:12:15');

-- --------------------------------------------------------

--
-- Table structure for table `pricing_features`
--

CREATE TABLE `pricing_features` (
  `id` int(11) NOT NULL,
  `pricing_plan_id` int(11) NOT NULL,
  `feature` text NOT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `pricing_features`
--

INSERT INTO `pricing_features` (`id`, `pricing_plan_id`, `feature`, `created_at`, `updated_at`) VALUES
(1, 1, '20 study chapters access', '2026-06-03 09:56:19', '2026-06-03 09:56:19'),
(2, 1, '5 practice sessions each day', '2026-06-03 09:56:19', '2026-06-03 09:56:19'),
(3, 1, 'Progress tracking', '2026-06-03 09:56:19', '2026-06-03 09:56:19'),
(4, 2, 'Unlimited mock exams', '2026-06-03 09:56:19', '2026-06-03 09:56:19'),
(5, 2, 'Detailed chapter analytics', '2026-06-03 09:56:19', '2026-06-03 09:56:19'),
(6, 2, 'Priority email support', '2026-06-03 09:56:19', '2026-06-03 09:56:19');

-- --------------------------------------------------------

--
-- Table structure for table `pricing_plans`
--

CREATE TABLE `pricing_plans` (
  `id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `regular_price_monthly` decimal(10,2) NOT NULL DEFAULT 0.00,
  `discount_price_monthly` decimal(10,2) NOT NULL DEFAULT 0.00,
  `regular_price_yearly` decimal(10,2) NOT NULL DEFAULT 0.00,
  `discount_price_yearly` decimal(10,2) NOT NULL DEFAULT 0.00,
  `status` enum('active','inactive') NOT NULL DEFAULT 'active',
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `pricing_plans`
--

INSERT INTO `pricing_plans` (`id`, `title`, `description`, `regular_price_monthly`, `discount_price_monthly`, `regular_price_yearly`, `discount_price_yearly`, `status`, `created_at`, `updated_at`) VALUES
(1, 'Starter', 'Free plan to begin your Passpilot study journey with chapters, practice, and mock exams.', 0.00, 0.00, 0.00, 0.00, 'active', '2026-06-03 09:56:19', '2026-06-03 09:56:19'),
(2, 'Pro', 'Unlimited practice, mock exams, and priority support for serious Canadian citizenship preparation.', 14.99, 14.99, 149.99, 149.99, 'active', '2026-06-03 09:56:19', '2026-06-03 09:56:19');

-- --------------------------------------------------------

--
-- Table structure for table `provinces`
--

CREATE TABLE `provinces` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `code` varchar(16) NOT NULL,
  `status` enum('active','inactive') NOT NULL DEFAULT 'active',
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `provinces`
--

INSERT INTO `provinces` (`id`, `name`, `code`, `status`, `created_at`, `updated_at`) VALUES
(1, 'Alberta', 'AB', 'active', '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(2, 'British Columbia', 'BC', 'active', '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(3, 'Manitoba', 'MB', 'active', '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(4, 'New Brunswick', 'NB', 'active', '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(5, 'Newfoundland and Labrador', 'NL', 'active', '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(6, 'Nova Scotia', 'NS', 'active', '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(7, 'Northwest Territories', 'NT', 'active', '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(8, 'Nunavut', 'NU', 'active', '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(9, 'Ontario', 'ON', 'active', '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(10, 'Prince Edward Island', 'PE', 'active', '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(11, 'Quebec', 'QC', 'active', '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(12, 'Saskatchewan', 'SK', 'active', '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(13, 'Yukon', 'YT', 'active', '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(14, 'California', 'CA', 'active', '2026-06-03 16:44:55', '2026-06-03 16:44:55');

-- --------------------------------------------------------

--
-- Table structure for table `questions`
--

CREATE TABLE `questions` (
  `id` int(11) NOT NULL,
  `chapter_id` int(11) NOT NULL,
  `question` text NOT NULL,
  `question_image` varchar(500) DEFAULT NULL,
  `question_type` enum('mcq','true_false') NOT NULL DEFAULT 'mcq',
  `correct_answer` varchar(255) DEFAULT NULL,
  `explanation` text DEFAULT NULL,
  `difficulty` enum('easy','medium','hard') NOT NULL DEFAULT 'easy',
  `status` enum('active','inactive') NOT NULL DEFAULT 'active',
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `questions`
--

INSERT INTO `questions` (`id`, `chapter_id`, `question`, `question_image`, `question_type`, `correct_answer`, `explanation`, `difficulty`, `status`, `created_at`, `updated_at`) VALUES
(1, 2, 'What are three responsibilities of citizenship?', NULL, 'mcq', '1', 'Canadian responsibilities include obeying the law, taking responsibility for oneself and one\'s family, serving on a jury, voting in elections, helping others in the community, and protecting and enjoying our heritage and environment.', 'easy', 'active', '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(2, 2, 'Name two key documents that contain our rights and freedoms.', NULL, 'mcq', '1', 'Canadian rights are rooted in the Magna Carta (1215), English common law, and the French civil code, and are codified in the Canadian Charter of Rights and Freedoms (1982) and the Canadian Human Rights Act.', 'easy', 'active', '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(3, 2, 'Which of the following is NOT a fundamental freedom guaranteed by the Canadian Charter?', NULL, 'mcq', '3', 'The Charter guarantees freedom of conscience and religion; thought, belief, opinion and expression including the press; peaceful assembly; and association.', 'easy', 'active', '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(4, 2, 'What is meant by the equality of women and men in Canada?', NULL, 'mcq', '2', 'In Canada, men and women are equal under the law. Canada\'s openness and generosity do not extend to barbaric cultural practices that tolerate spousal abuse, \'honour killings,\' female genital mutilation, forced marriage or other gender-based violence.', 'easy', 'active', '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(5, 2, 'Which right gives Canadians the freedom to live and work anywhere in Canada?', NULL, 'mcq', '2', 'Mobility rights mean Canadians can live and work anywhere they choose in Canada, enter and leave the country freely, and apply for a passport.', 'medium', 'active', '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(6, 2, 'Which of the following is a responsibility of Canadian citizenship?', NULL, 'mcq', '1', 'Serving on a jury when called is a responsibility of citizenship. It is a privilege that makes the justice system work and depends on impartial juries of citizens.', 'easy', 'active', '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(7, 2, 'What is habeas corpus?', NULL, 'mcq', '1', 'Habeas corpus, the right to challenge unlawful detention by the state, comes from English common law and is one of Canada\'s most important legal rights.', 'medium', 'active', '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(8, 2, 'Which is an example of taking responsibility for yourself and your family?', NULL, 'mcq', '0', 'Getting a job, taking care of one\'s family and working hard in keeping with one\'s abilities are important Canadian values. Hard work in turn brings personal dignity and self-respect.', 'easy', 'active', '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(9, 3, 'Who were the founding peoples of Canada?', NULL, 'mcq', '1', 'Aboriginal, French and British peoples are the founding peoples of Canada.', 'easy', 'active', '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(10, 3, 'Who are the Métis?', NULL, 'mcq', '1', 'The Métis are a distinct people of mixed Aboriginal and European ancestry, the majority of whom live on the Prairies. They speak their own dialect, Michif.', 'easy', 'active', '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(11, 3, 'What does the word \'Inuit\' mean?', NULL, 'mcq', '0', 'Inuit, meaning \'the people\' in the Inuktitut language, live in small, scattered communities across the Arctic.', 'easy', 'active', '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(12, 3, 'What three groups make up the Aboriginal peoples of Canada?', NULL, 'mcq', '0', 'The Aboriginal peoples include First Nations (Indians), Métis and Inuit.', 'medium', 'active', '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(13, 3, 'What are Canada\'s two official languages?', NULL, 'mcq', '1', 'English and French are the two official languages of Canada and are important symbols of identity.', 'easy', 'active', '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(14, 3, 'Where do most French-speaking Canadians live?', NULL, 'mcq', '1', 'The province of Quebec is home to the majority of Canada\'s French-speaking population. There are also one million Francophones outside Quebec, including Acadians.', 'medium', 'active', '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(15, 3, 'Who are the Acadians?', NULL, 'mcq', '1', 'Acadians are the descendants of French colonists who began settling in what are now the Maritime provinces in 1604.', 'medium', 'active', '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(16, 3, 'What is an Anglophone?', NULL, 'mcq', '0', 'Anglophones are people whose first language is English. Francophones are people whose first language is French.', 'easy', 'active', '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(17, 3, 'What is the term used to describe Canadians whose first language learned is neither English nor French?', NULL, 'mcq', '1', 'An Allophone is a resident whose first language learned is neither English nor French.', 'easy', 'active', '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(18, 4, 'What does Confederation mean?', NULL, 'mcq', '0', 'Confederation refers to the union of the British North American colonies of Nova Scotia, New Brunswick, and the Province of Canada into the Dominion of Canada on July 1, 1867.', 'easy', 'active', '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(19, 4, 'In what year did Canada become a country (Confederation)?', NULL, 'mcq', '1', 'On July 1, 1867, the British North America Act came into effect, creating the Dominion of Canada. July 1 is celebrated as Canada Day.', 'easy', 'active', '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(20, 4, 'Who was Canada\'s first Prime Minister?', NULL, 'mcq', '1', 'Sir John Alexander Macdonald, born in Scotland, became Canada\'s first Prime Minister. His portrait is on the $10 bill, and his birthday (January 11) is Sir John A. Macdonald Day.', 'easy', 'active', '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(21, 4, 'What is meant by \'responsible government\'?', NULL, 'mcq', '1', 'Responsible government means that the ministers of the Crown must have the support of a majority of the elected representatives in order to govern.', 'medium', 'active', '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(22, 4, 'Who was Sir Louis-Hippolyte La Fontaine?', NULL, 'mcq', '1', 'Sir Louis-Hippolyte La Fontaine, a champion of democracy and French language rights, became the first head of a responsible government in the Canadas in 1849.', 'hard', 'active', '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(23, 4, 'What did the Canadian Pacific Railway symbolize?', NULL, 'mcq', '1', 'The Canadian Pacific Railway, completed in 1885, symbolized national unity, joining Canada from the Atlantic to the Pacific.', 'medium', 'active', '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(24, 4, 'What is the significance of the discovery of insulin by Sir Frederick Banting and Charles Best?', NULL, 'mcq', '1', 'In 1922, Sir Frederick Banting and Charles Best discovered insulin, a hormone to treat diabetes, which until then was a fatal disease — saving millions of lives worldwide.', 'medium', 'active', '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(25, 4, 'Who led the defence against the United States in the War of 1812?', NULL, 'mcq', '1', 'Major-General Sir Isaac Brock and his Indigenous ally Chief Tecumseh led the successful defence against the American invasion in the War of 1812.', 'medium', 'active', '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(26, 4, 'What significant World War I battle is considered a defining moment for Canada?', NULL, 'mcq', '1', 'On April 9, 1917, all four Canadian Corps divisions stormed Vimy Ridge in France, capturing it from the Germans. April 9 is celebrated as Vimy Day.', 'medium', 'active', '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(27, 4, 'What was Canada\'s contribution in World War II?', NULL, 'mcq', '1', 'More than one million Canadians and Newfoundlanders served in World War II. Canadian soldiers liberated the Netherlands and landed at Juno Beach on D-Day, June 6, 1944.', 'medium', 'active', '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(28, 4, 'Who claimed the land that is now Canada for King Francis I of France in 1534?', NULL, 'mcq', '1', 'Jacques Cartier made three voyages across the Atlantic, claiming the land for King Francis I of France. He heard two Indigenous guides use the Iroquoian word \'kanata,\' meaning \'village\' — and Canada got its name.', 'medium', 'active', '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(29, 4, 'Who founded Quebec City in 1608 and is known as the \'Father of New France\'?', NULL, 'mcq', '1', 'Samuel de Champlain built a fortress at Quebec City in 1608 and is known as the \'Father of New France.\'', 'medium', 'active', '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(30, 5, 'Which province first gave women the right to vote in 1916?', NULL, 'mcq', '2', 'In 1916, Manitoba became the first province to grant voting rights to women. By 1918, most Canadian female citizens 21 and over could vote in federal elections.', 'medium', 'active', '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(31, 5, 'When was the Canadian Charter of Rights and Freedoms adopted?', NULL, 'mcq', '2', 'In 1982, the Canadian Charter of Rights and Freedoms was added to the Constitution Act, 1982, by Prime Minister Pierre Elliott Trudeau.', 'easy', 'active', '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(32, 5, 'When was the current Canadian flag (Maple Leaf Flag) raised for the first time?', NULL, 'mcq', '1', 'The red and white Maple Leaf flag was raised for the first time in 1965 under Prime Minister Lester B. Pearson.', 'medium', 'active', '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(33, 5, 'Who helped develop universal medicare in Canada?', NULL, 'mcq', '1', 'Tommy Douglas, a Baptist minister and Saskatchewan premier, helped establish in 1962 the first government-controlled, universal, comprehensive single-payer medical insurance plan in Canada.', 'medium', 'active', '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(34, 5, 'Who introduced the Canadian Bill of Rights in 1960?', NULL, 'mcq', '0', 'Prime Minister John Diefenbaker introduced the Canadian Bill of Rights in 1960. Today this is part of the Canadian Charter of Rights and Freedoms.', 'medium', 'active', '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(35, 6, 'What does it mean to say that Canada is a constitutional monarchy?', NULL, 'mcq', '1', 'In Canada\'s constitutional monarchy, the Sovereign is the head of state and reigns in accordance with the Constitution and the rule of law.', 'easy', 'active', '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(36, 6, 'What are the three branches of government in Canada?', NULL, 'mcq', '1', 'The three branches of government are executive (which puts laws into effect), legislative (which makes laws), and judicial (which decides cases according to the laws).', 'easy', 'active', '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(37, 6, 'What is the difference between the role of the Queen and that of the Prime Minister?', NULL, 'mcq', '1', 'The Sovereign is Canada\'s head of state — a symbol of Canadian sovereignty and a guardian of constitutional freedoms. The Prime Minister is the head of government and selects the Cabinet ministers.', 'medium', 'active', '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(38, 6, 'What are the three levels of government in Canada?', NULL, 'mcq', '0', 'The three levels of government in Canada are federal (national), provincial/territorial, and municipal (city/local).', 'easy', 'active', '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(39, 6, 'What are the three parts of Parliament?', NULL, 'mcq', '1', 'Parliament has three parts: the Sovereign (Queen or King), the Senate, and the House of Commons. Provincial legislatures comprise the Lieutenant Governor and the elected Assembly.', 'easy', 'active', '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(40, 6, 'How are senators chosen in Canada?', NULL, 'mcq', '1', 'Senators are appointed by the Governor General on the advice of the Prime Minister and serve until age 75.', 'medium', 'active', '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(41, 7, 'How are members of Parliament chosen?', NULL, 'mcq', '2', 'Members of Parliament (MPs) are elected by voters in each electoral district (also called constituencies or ridings).', 'easy', 'active', '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(42, 7, 'Who is entitled to vote in Canadian federal elections?', NULL, 'mcq', '1', 'To vote in a federal election, a person must be a Canadian citizen, at least 18 years old on voting day, and on the voters\' list.', 'easy', 'active', '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(43, 7, 'In Canada, are you obliged to tell other people how you voted?', NULL, 'mcq', '2', 'No. The ballot is secret. Canadians enjoy a secret ballot — a fundamental democratic right.', 'easy', 'active', '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(44, 7, 'After a federal election, which party forms the government?', NULL, 'mcq', '1', 'The political party with the most elected representatives (MPs) usually forms the government. Its leader becomes the Prime Minister.', 'easy', 'active', '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(45, 7, 'When you go to vote on election day, what do you do?', NULL, 'mcq', '1', 'You go to the polling station, prove your identity and address, then go behind the voting screen to mark an X on the ballot next to the name of the candidate of your choice.', 'easy', 'active', '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(46, 7, 'What is a majority government?', NULL, 'mcq', '0', 'If the party in power holds at least half the seats in the House of Commons, it is called a majority government. If it holds less than half, it is called a minority government.', 'medium', 'active', '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(47, 8, 'What is the role of the courts in Canada?', NULL, 'mcq', '1', 'The courts in Canada settle disputes between people, and between people and the government. They decide whether someone has broken a law.', 'easy', 'active', '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(48, 8, 'In Canada, are you allowed to question the police about their service or conduct?', NULL, 'mcq', '1', 'Yes. The police are there to keep people safe and enforce the law. You can question them about their service or conduct if you need to.', 'easy', 'active', '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(49, 8, 'What is the highest court in Canada?', NULL, 'mcq', '1', 'The Supreme Court of Canada is the highest court in the country, the final court of appeal.', 'medium', 'active', '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(50, 8, 'What is the rule of law?', NULL, 'mcq', '1', 'The rule of law means that the law applies equally to everyone, including the police, governments and public officials. No one is above the law.', 'easy', 'active', '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(51, 8, 'In Canada\'s justice system, who is presumed innocent until proven guilty?', NULL, 'mcq', '0', 'Everyone charged with an offence is presumed innocent until proven guilty in a fair trial.', 'easy', 'active', '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(52, 9, 'What is the meaning of the Remembrance Day poppy?', NULL, 'mcq', '3', 'The poppy is a symbol of remembrance, worn each November to honour the sacrifice of Canadians who have served or died in wars up to the present day.', 'easy', 'active', '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(53, 9, 'What is the highest honour that Canadians can receive?', NULL, 'mcq', '1', 'The Victoria Cross (V.C.) is the highest honour available to Canadians. It is awarded for the most conspicuous bravery, daring or pre-eminent act of valour, self-sacrifice or extreme devotion to duty in the presence of the enemy.', 'easy', 'active', '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(54, 9, 'What is the national anthem of Canada?', NULL, 'mcq', '1', '\'O Canada\' was proclaimed as Canada\'s national anthem in 1980. It was first sung in Quebec City in 1880.', 'easy', 'active', '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(55, 9, 'What is the royal anthem of Canada?', NULL, 'mcq', '1', 'The royal anthem of Canada is \'God Save the Queen\' (or King). It can be played or sung on any occasion when Canadians wish to honour the Sovereign.', 'medium', 'active', '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(56, 9, 'Which of the following are Canadian symbols?', NULL, 'mcq', '1', 'Canadian symbols include the Maple Leaf flag, the beaver, the Canadian Coat of Arms, the maple tree, the fleur-de-lys, the Crown, and Parliament Buildings.', 'easy', 'active', '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(57, 9, 'Why is the beaver a Canadian symbol?', NULL, 'mcq', '1', 'The beaver was adopted as a symbol of the Hudson\'s Bay Company because of the fur trade. It appears on the Canadian five-cent coin.', 'medium', 'active', '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(58, 10, 'What are Canada\'s three main types of industries?', NULL, 'mcq', '1', 'Canada\'s economy includes three main types of industries: service industries (which provide thousands of different jobs), manufacturing industries, and natural resources industries (forestry, fishing, agriculture, mining and energy).', 'medium', 'active', '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(59, 10, 'What is Canada\'s largest trading partner?', NULL, 'mcq', '1', 'The United States is by far Canada\'s largest trading partner.', 'easy', 'active', '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(60, 10, 'What is Canada\'s currency?', NULL, 'mcq', '1', 'The Canadian dollar is Canada\'s currency. The Royal Canadian Mint produces Canadian circulation coins.', 'easy', 'active', '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(61, 11, 'What provinces are referred to as the Atlantic Provinces?', NULL, 'mcq', '1', 'The Atlantic Provinces are Newfoundland and Labrador, Prince Edward Island, Nova Scotia, and New Brunswick.', 'easy', 'active', '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(62, 11, 'What are the Prairie Provinces?', NULL, 'mcq', '1', 'The Prairie Provinces are Manitoba, Saskatchewan and Alberta — rich in energy resources and some of the most fertile farmland in the world.', 'easy', 'active', '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(63, 11, 'Which provinces are referred to as Central Canada?', NULL, 'mcq', '1', 'Quebec and Ontario are referred to as Central Canada. They are home to more than half of the Canadian population.', 'easy', 'active', '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(64, 11, 'What are Canada\'s three northern territories?', NULL, 'mcq', '0', 'Canada\'s three territories — Yukon, Northwest Territories and Nunavut — cover one-third of Canada\'s land mass.', 'easy', 'active', '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(65, 11, 'What is the capital city of Canada?', NULL, 'mcq', '2', 'Ottawa, located in Ontario on the Ottawa River, was chosen as the capital in 1857 by Queen Victoria.', 'easy', 'active', '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(66, 11, 'What is the capital of British Columbia?', NULL, 'mcq', '1', 'Victoria is the capital of British Columbia. The largest city is Vancouver.', 'medium', 'active', '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(67, 11, 'How many provinces and territories make up Canada?', NULL, 'mcq', '0', 'Canada has ten provinces and three territories.', 'easy', 'active', '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(68, 11, 'When did Nunavut become a separate territory?', NULL, 'mcq', '2', 'Nunavut, meaning \'our land\' in Inuktitut, was established in 1999 as the third territory.', 'medium', 'active', '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(69, 1, 'How is the citizenship test usually given?', NULL, 'mcq', '1', 'The citizenship test is usually a written test, but it could be an interview. You will be tested on knowledge of Canada and adequate knowledge of English or French.', 'easy', 'active', '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(70, 1, 'At what age are adult applicants no longer required to write the citizenship test?', NULL, 'mcq', '2', 'Adult applicants 55 years of age and over do not need to write the citizenship test.', 'medium', 'active', '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(71, 1, 'What happens at the citizenship ceremony?', NULL, 'mcq', '1', 'At the ceremony you take the Oath of Citizenship, sign the oath form, and receive your Canadian Citizenship Certificate.', 'easy', 'active', '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(72, 1, 'What is the pass mark on the Canadian citizenship test?', NULL, 'mcq', '2', 'The pass mark is 15 out of 20 (75%). Adults aged 18–54 must pass.', 'easy', 'active', '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(73, 1, 'What is one of the two basic requirements that the citizenship test assesses?', NULL, 'mcq', '0', 'The test assesses (1) knowledge of Canada and the rights and responsibilities of citizenship, and (2) adequate knowledge of English or French.', 'easy', 'active', '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(74, 2, 'Which historical document is often called \'the Great Charter of Freedoms\' and is a key source of Canadian rights?', NULL, 'mcq', '1', 'Magna Carta, signed in England in 1215, is a foundational source of the rights and freedoms enjoyed by Canadians today.', 'medium', 'active', '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(75, 2, 'How often must federal elections be held under the Charter (except in war or emergency)?', NULL, 'mcq', '1', 'The Charter guarantees that no government can hold power for more than five years without a federal election (except in time of war or national emergency).', 'medium', 'active', '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(76, 2, 'Is military service in the Canadian Armed Forces compulsory for Canadian citizens?', NULL, 'mcq', '2', 'Military service is voluntary. Serving in the Canadian Forces (regular or reserve) or police is a noble way to contribute, but it is not compulsory.', 'medium', 'active', '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(77, 2, 'Whose Aboriginal and treaty rights does the Constitution recognize and affirm?', NULL, 'mcq', '1', 'The Constitution Act, 1982 recognizes and affirms the Aboriginal and treaty rights of First Nations, Inuit and Métis peoples.', 'medium', 'active', '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(78, 2, 'What is meant by \'the rule of law\'?', NULL, 'mcq', '1', 'The rule of law means no person or government is above the law — laws apply equally to all.', 'easy', 'active', '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(79, 3, 'What language/dialect do the Métis speak?', NULL, 'mcq', '2', 'The Métis speak their own dialect, Michif, which blends Cree and French.', 'medium', 'active', '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(80, 3, 'In what year did the Government of Canada formally apologize for the Indian Residential Schools system?', NULL, 'mcq', '2', 'In 2008, the Government of Canada formally apologized to former students of Indian Residential Schools and their families.', 'hard', 'active', '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(81, 3, 'Approximately what share of the Aboriginal population in Canada is First Nations?', NULL, 'mcq', '2', 'About 65% of Aboriginal people are First Nations; the rest are Métis and Inuit.', 'hard', 'active', '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(82, 3, 'Where do the Inuit primarily live?', NULL, 'mcq', '1', 'Inuit live in small, scattered communities across the Arctic, including Nunavut, Northwest Territories, Northern Quebec and Labrador.', 'medium', 'active', '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(83, 3, 'Approximately how many Canadians have French as their first language?', NULL, 'mcq', '2', 'About seven million Canadians have French as their first language; most live in Quebec, with about one million Francophones outside Quebec.', 'medium', 'active', '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(84, 3, 'Approximately how many Canadians have English as their first language?', NULL, 'mcq', '2', 'About 18 million Canadians have English as their first language. Many millions more speak it as a second language.', 'medium', 'active', '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(85, 4, 'Which group established a brief North American settlement at L\'Anse aux Meadows around 1000 AD?', NULL, 'mcq', '1', 'Norse Vikings established a short-lived settlement at L\'Anse aux Meadows in Newfoundland around 1000 AD.', 'hard', 'active', '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(86, 4, 'Who reached Newfoundland in 1497 and claimed it for England?', NULL, 'mcq', '1', 'John Cabot, an Italian navigator sailing for England, reached Newfoundland in 1497 and claimed it for England.', 'medium', 'active', '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(87, 4, 'In what year did King Louis XIV make Canada a royal province of France?', NULL, 'mcq', '1', 'In 1663, Louis XIV (the \'Sun King\') made Canada a royal province with full government, including an Intendant and a Sovereign Council.', 'hard', 'active', '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(88, 4, 'Who were the two opposing generals at the Battle of the Plains of Abraham in 1759?', NULL, 'mcq', '0', 'British General James Wolfe defeated French General Louis-Joseph de Montcalm at Quebec in 1759. Both generals died of wounds.', 'medium', 'active', '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(89, 4, 'What did the Quebec Act of 1774 do?', NULL, 'mcq', '1', 'The Quebec Act (1774) accommodated the French-speaking Catholic majority by allowing religious freedom and restoring French civil law — helping Quebec remain loyal during the American Revolution.', 'hard', 'active', '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(90, 4, 'Who were the Loyalists?', NULL, 'mcq', '2', 'Loyalists were people loyal to the Crown who left the United States during and after the American Revolution and settled in what is now Canada.', 'medium', 'active', '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(91, 4, 'Who walked 30 km in 1813 to warn the British of an American attack at Beaver Dams?', NULL, 'mcq', '0', 'Laura Secord, a Loyalist wife and mother of five, made a dangerous trek of 30 kilometres on foot to warn the British of an impending American attack in 1813.', 'medium', 'active', '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(92, 4, 'On which Canadian banknote does Sir John A. Macdonald appear?', NULL, 'mcq', '1', 'Sir John A. Macdonald, Canada\'s first Prime Minister, is featured on the $10 bill.', 'medium', 'active', '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(93, 4, 'On which Canadian banknote does Sir Wilfrid Laurier appear?', NULL, 'mcq', '0', 'Sir Wilfrid Laurier, the first French Canadian Prime Minister (elected 1896), is featured on the $5 bill.', 'medium', 'active', '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(94, 4, 'When did Newfoundland join Confederation?', NULL, 'mcq', '3', 'Newfoundland (now Newfoundland and Labrador) joined Confederation on March 31, 1949 — becoming Canada\'s tenth province.', 'hard', 'active', '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(95, 4, 'What did the Statute of Westminster (1931) do?', NULL, 'mcq', '1', 'The Statute of Westminster (1931) granted Canada full legal autonomy from Britain — except for amendments to the Constitution, which still required British action until 1982.', 'hard', 'active', '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(96, 4, 'Canadian forces fought in which war from 1950 to 1953?', NULL, 'mcq', '2', 'More than 26,000 Canadians served in the Korean War (1950–1953) as part of the United Nations forces; over 500 died.', 'medium', 'active', '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(97, 4, 'Who commanded the Canadian Corps at Vimy Ridge?', NULL, 'mcq', '0', 'Lieutenant-General Sir Arthur Currie, Canada\'s greatest soldier, commanded the Canadian Corps at Vimy Ridge in April 1917.', 'hard', 'active', '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(98, 5, 'In what year did Canada pass the Canadian Multiculturalism Act?', NULL, 'mcq', '2', 'The Canadian Multiculturalism Act was passed in 1988, making Canada one of the first countries to adopt multiculturalism as official policy.', 'medium', 'active', '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(99, 5, 'In what year did First Nations people gain the unrestricted right to vote in federal elections?', NULL, 'mcq', '2', 'First Nations people gained the unrestricted right to vote in federal elections in 1960.', 'hard', 'active', '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(100, 5, 'When was the Official Languages Act passed?', NULL, 'mcq', '2', 'The Official Languages Act (1969) gave English and French equal status in the federal government, under Prime Minister Pierre Trudeau.', 'medium', 'active', '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(101, 5, 'In what year did Quebec hold its second referendum on sovereignty?', NULL, 'mcq', '3', 'Quebec held referendums on sovereignty in 1980 and 1995. The 1995 vote was defeated by a margin of about 50.6% to 49.4%.', 'hard', 'active', '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(102, 5, 'On what date is the National Flag of Canada Day observed?', NULL, 'mcq', '1', 'National Flag of Canada Day is February 15, marking the date in 1965 when the Maple Leaf flag was raised for the first time.', 'easy', 'active', '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(103, 6, 'Which of the following is a federal (national) responsibility?', NULL, 'mcq', '2', 'Federal jurisdiction includes national defence, foreign policy, citizenship, criminal law, currency, and other national matters.', 'medium', 'active', '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(104, 6, 'Which of the following is mainly a provincial responsibility?', NULL, 'mcq', '2', 'Provinces have jurisdiction over education, healthcare delivery, civil law, natural resources and other provincial matters.', 'medium', 'active', '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(105, 6, 'Who represents the Sovereign at the provincial level?', NULL, 'mcq', '1', 'Each province has a Lieutenant Governor as the Sovereign\'s representative; at the federal level the Sovereign is represented by the Governor General.', 'hard', 'active', '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(106, 6, 'What is the title of the head of government in a province?', NULL, 'mcq', '1', 'The leader of the elected provincial party with the most seats becomes the Premier. The PM leads the federal government.', 'medium', 'active', '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(107, 6, 'Until what age do Canadian senators serve?', NULL, 'mcq', '2', 'Senators are appointed by the Governor General on the PM\'s advice and serve until age 75.', 'hard', 'active', '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(108, 6, 'Who selects the Cabinet ministers?', NULL, 'mcq', '2', 'The Prime Minister chooses Cabinet ministers, who are usually MPs from the governing party. Cabinet sets government policy.', 'medium', 'active', '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(109, 7, 'What is another name for an electoral district in Canada?', NULL, 'mcq', '1', 'Electoral districts are commonly called \'ridings\' or constituencies. Each elects one MP.', 'easy', 'active', '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(110, 7, 'When you vote in a federal election, you must show proof of which of the following?', NULL, 'mcq', '0', 'Voters must prove their identity and address (with accepted ID) before receiving a ballot.', 'medium', 'active', '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(111, 7, 'In Quebec, members of the provincial legislature are called?', NULL, 'mcq', '2', 'In Quebec, the provincial legislature is the Assemblée nationale and its members are MNAs (Members of the National Assembly).', 'hard', 'active', '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(112, 7, 'In Ontario, members of the provincial legislature are called?', NULL, 'mcq', '1', 'Ontario calls its provincial legislators MPPs (Members of Provincial Parliament).', 'hard', 'active', '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(113, 7, 'Who do voters elect at the municipal level?', NULL, 'mcq', '2', 'Municipal elections choose mayors and councillors who run cities and towns.', 'easy', 'active', '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(114, 8, 'If you are arrested in Canada, what right do you have?', NULL, 'mcq', '0', 'You have the right to retain and instruct legal counsel without delay, and to be informed of that right. Legal aid is available for those who cannot afford a lawyer.', 'easy', 'active', '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(115, 8, 'What does RCMP stand for?', NULL, 'mcq', '1', 'The Royal Canadian Mounted Police (RCMP) is the federal police force and also acts as the provincial police in most provinces and territories.', 'easy', 'active', '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(116, 8, 'Which two provinces have their own provincial police forces (not the RCMP)?', NULL, 'mcq', '0', 'Ontario (Ontario Provincial Police, OPP) and Quebec (Sûreté du Québec) have their own provincial police forces. The RCMP serves as the provincial police force elsewhere.', 'hard', 'active', '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(117, 9, 'On what date was the Maple Leaf flag raised for the first time?', NULL, 'mcq', '1', 'The Maple Leaf flag was raised for the first time on February 15, 1965 — now National Flag of Canada Day.', 'medium', 'active', '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(118, 9, 'What does the Crown symbolize in Canada?', NULL, 'mcq', '0', 'The Crown is a symbol of Canada\'s parliamentary democracy and represents the Sovereign and the institutions of government.', 'medium', 'active', '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(119, 9, 'What is Canada\'s official motto?', NULL, 'mcq', '1', 'Canada\'s national motto is \'A mari usque ad mare,\' Latin for \'From sea to sea.\'', 'hard', 'active', '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(120, 9, 'Who composed the music for \'O Canada\'?', NULL, 'mcq', '0', 'The music of \'O Canada\' was composed by Calixa Lavallée in 1880. The French lyrics are by Sir Adolphe-Basile Routhier; the English lyrics were adapted by Robert Stanley Weir.', 'hard', 'active', '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(121, 9, 'In what year was \'O Canada\' officially proclaimed Canada\'s national anthem?', NULL, 'mcq', '3', '\'O Canada\' was proclaimed as Canada\'s national anthem in 1980, although it had been sung at official events since 1880.', 'medium', 'active', '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(122, 9, 'Which sport is Canada\'s national winter sport?', NULL, 'mcq', '1', 'Hockey is Canada\'s national winter sport. Lacrosse is Canada\'s national summer sport (both recognized by federal law in 1994).', 'medium', 'active', '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(123, 9, 'What is Canada\'s national summer sport?', NULL, 'mcq', '2', 'Lacrosse, which has Indigenous origins, is Canada\'s national summer sport.', 'medium', 'active', '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(124, 9, 'When is Remembrance Day observed in Canada?', NULL, 'mcq', '2', 'Remembrance Day is observed on November 11, the anniversary of the end of World War I, to honour those who have served in war.', 'easy', 'active', '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(125, 9, 'In what year was the Order of Canada created?', NULL, 'mcq', '1', 'The Order of Canada was created in 1967, the centennial of Confederation, to honour outstanding lifetime contributions to the country.', 'hard', 'active', '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(126, 10, 'Which institution produces Canada\'s circulation coins?', NULL, 'mcq', '1', 'The Royal Canadian Mint produces Canada\'s circulation coins. The Bank of Canada issues banknotes.', 'hard', 'active', '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(127, 10, 'What is the name of Canada\'s central bank?', NULL, 'mcq', '2', 'The Bank of Canada is Canada\'s central bank. It sets monetary policy and issues banknotes.', 'medium', 'active', '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(128, 10, 'Canada is a member of which group of seven major advanced economies?', NULL, 'mcq', '0', 'Canada is a member of the G7 (Group of Seven) alongside the US, UK, France, Germany, Italy and Japan. Canada is also part of the G20.', 'hard', 'active', '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(129, 10, 'Which industry sector employs the most Canadians?', NULL, 'mcq', '2', 'Service industries employ most Canadians — including transportation, education, healthcare, construction, banking, communications, retail, tourism, and government.', 'medium', 'active', '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(130, 11, 'What is the capital of Newfoundland and Labrador?', NULL, 'mcq', '2', 'St. John\'s is the capital of Newfoundland and Labrador — and the easternmost city in North America.', 'easy', 'active', '2026-06-03 09:56:19', '2026-06-03 09:56:19'),
(131, 11, 'What is the capital of Prince Edward Island?', NULL, 'mcq', '1', 'Charlottetown is the capital of Prince Edward Island, known as the \'Birthplace of Confederation\' for the 1864 conference.', 'easy', 'active', '2026-06-03 09:56:19', '2026-06-03 09:56:19'),
(132, 11, 'What is the capital of Nova Scotia?', NULL, 'mcq', '1', 'Halifax is the capital of Nova Scotia, a major shipping centre on the Atlantic.', 'easy', 'active', '2026-06-03 09:56:19', '2026-06-03 09:56:19'),
(133, 11, 'What is the capital of New Brunswick?', NULL, 'mcq', '2', 'Fredericton is the capital of New Brunswick — Canada\'s only officially bilingual province.', 'easy', 'active', '2026-06-03 09:56:19', '2026-06-03 09:56:19'),
(134, 11, 'Which province is officially bilingual?', NULL, 'mcq', '2', 'New Brunswick is the only officially bilingual province (English and French).', 'medium', 'active', '2026-06-03 09:56:19', '2026-06-03 09:56:19'),
(135, 11, 'What is the capital of Quebec?', NULL, 'mcq', '1', 'Quebec City is the capital of Quebec. Montreal is the largest city and the second-largest French-speaking city in the world.', 'easy', 'active', '2026-06-03 09:56:19', '2026-06-03 09:56:19'),
(136, 11, 'What is the capital of Ontario?', NULL, 'mcq', '0', 'Toronto is the capital of Ontario and Canada\'s largest city — the financial centre of the country. Ottawa is the federal capital.', 'easy', 'active', '2026-06-03 09:56:19', '2026-06-03 09:56:19'),
(137, 11, 'What is the capital of Manitoba?', NULL, 'mcq', '1', 'Winnipeg is the capital of Manitoba — historically the centre of the Métis nation.', 'easy', 'active', '2026-06-03 09:56:19', '2026-06-03 09:56:19'),
(138, 11, 'What is the capital of Saskatchewan?', NULL, 'mcq', '1', 'Regina is the capital of Saskatchewan and home to the RCMP training academy. Saskatoon is the province\'s largest city.', 'easy', 'active', '2026-06-03 09:56:19', '2026-06-03 09:56:19'),
(139, 11, 'What is the capital of Alberta?', NULL, 'mcq', '1', 'Edmonton is the capital of Alberta. Calgary is the largest city and famous for the Calgary Stampede.', 'easy', 'active', '2026-06-03 09:56:19', '2026-06-03 09:56:19'),
(140, 11, 'What is the capital of Yukon?', NULL, 'mcq', '1', 'Whitehorse is the capital of Yukon, famous for the Klondike Gold Rush in the 1890s.', 'medium', 'active', '2026-06-03 09:56:19', '2026-06-03 09:56:19'),
(141, 11, 'What is the capital of the Northwest Territories?', NULL, 'mcq', '2', 'Yellowknife is the capital of the Northwest Territories — known for diamond mining.', 'medium', 'active', '2026-06-03 09:56:19', '2026-06-03 09:56:19'),
(142, 11, 'What is the capital of Nunavut?', NULL, 'mcq', '0', 'Iqaluit is the capital of Nunavut, the newest territory (created in 1999).', 'medium', 'active', '2026-06-03 09:56:19', '2026-06-03 09:56:19'),
(143, 11, 'Which Canadian port is the country\'s largest and busiest?', NULL, 'mcq', '2', 'The Port of Vancouver, on Canada\'s Pacific coast, is the country\'s largest and busiest port.', 'hard', 'active', '2026-06-03 09:56:19', '2026-06-03 09:56:19'),
(144, 11, 'Which Canadian city is the only walled city north of Mexico?', NULL, 'mcq', '0', 'Quebec City is the only walled city north of Mexico, a UNESCO World Heritage Site.', 'hard', 'active', '2026-06-03 09:56:19', '2026-06-03 09:56:19'),
(145, 11, 'Who chose Ottawa as the capital of Canada in 1857?', NULL, 'mcq', '0', 'Queen Victoria chose Ottawa as the capital of the Province of Canada in 1857; it became the national capital at Confederation in 1867.', 'medium', 'active', '2026-06-03 09:56:19', '2026-06-03 09:56:19');

-- --------------------------------------------------------

--
-- Table structure for table `question_options`
--

CREATE TABLE `question_options` (
  `id` int(11) NOT NULL,
  `question_id` int(11) NOT NULL,
  `option_text` text NOT NULL,
  `is_correct` tinyint(1) NOT NULL DEFAULT 0,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `question_options`
--

INSERT INTO `question_options` (`id`, `question_id`, `option_text`, `is_correct`, `created_at`, `updated_at`) VALUES
(1, 1, 'Being loyal to Canada, recycling newspapers, serving in the navy, army or air force.', 0, '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(2, 1, 'Obeying the law, taking responsibility for oneself and one\'s family, serving on a jury.', 1, '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(3, 1, 'Learning both official languages, voting in elections, belonging to a union.', 0, '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(4, 1, 'Buying Canadian products, owning your own business, using less water.', 0, '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(5, 2, 'The Magna Carta and the Bill of Rights, 1689.', 0, '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(6, 2, 'The Canadian Charter of Rights and Freedoms and the Canadian Human Rights Act.', 1, '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(7, 2, 'The Declaration of Independence and the Constitution of the United States.', 0, '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(8, 2, 'The Quebec Act and the Indian Act.', 0, '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(9, 3, 'Freedom of conscience and religion.', 0, '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(10, 3, 'Freedom of thought, belief, opinion and expression.', 0, '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(11, 3, 'Freedom of peaceful assembly.', 0, '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(12, 3, 'Freedom from paying taxes.', 1, '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(13, 4, 'Women and men work the same jobs.', 0, '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(14, 4, 'Men and women earn identical incomes by law.', 0, '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(15, 4, 'Both women and men are equal under the law; gender-based violence and \'honour killings\' are crimes.', 1, '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(16, 4, 'Only men can hold political office.', 0, '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(17, 5, 'Aboriginal Peoples\' rights.', 0, '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(18, 5, 'Official language rights and minority language educational rights.', 0, '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(19, 5, 'Mobility rights.', 1, '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(20, 5, 'Multiculturalism rights.', 0, '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(21, 6, 'Owning property.', 0, '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(22, 6, 'Serving on a jury when called.', 1, '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(23, 6, 'Belonging to a political party.', 0, '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(24, 6, 'Speaking both official languages.', 0, '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(25, 7, 'The right to vote.', 0, '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(26, 7, 'The right to challenge unlawful detention by the state.', 1, '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(27, 7, 'The right to free speech.', 0, '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(28, 7, 'The right to own property.', 0, '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(29, 8, 'Getting a job, taking care of one\'s family, and working hard.', 1, '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(30, 8, 'Only voting in elections.', 0, '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(31, 8, 'Only paying taxes.', 0, '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(32, 8, 'Only attending citizenship ceremonies.', 0, '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(33, 9, 'British, French and German.', 0, '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(34, 9, 'Aboriginal, French and British.', 1, '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(35, 9, 'Spanish, Portuguese and Dutch.', 0, '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(36, 9, 'Scottish, Irish and Welsh.', 0, '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(37, 10, 'Recent immigrants from France.', 0, '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(38, 10, 'A distinct people of mixed Aboriginal and European ancestry, the majority of whom live on the Prairies.', 1, '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(39, 10, 'Inuit who live in the Arctic.', 0, '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(40, 10, 'Members of the First Nations only.', 0, '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(41, 11, '\'The people\' in the Inuktitut language.', 1, '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(42, 11, '\'The hunters\' in French.', 0, '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(43, 11, '\'The northerners\' in English.', 0, '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(44, 11, '\'The travelers\' in Cree.', 0, '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(45, 12, 'First Nations, Métis, and Inuit.', 1, '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(46, 12, 'Cree, Iroquois, and Algonquin.', 0, '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(47, 12, 'Anglophones, Francophones, and Allophones.', 0, '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(48, 12, 'Eastern, Central, and Western peoples.', 0, '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(49, 13, 'English and Spanish.', 0, '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(50, 13, 'English and French.', 1, '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(51, 13, 'French and Inuktitut.', 0, '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(52, 13, 'English and Mandarin.', 0, '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(53, 14, 'British Columbia.', 0, '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(54, 14, 'Quebec.', 1, '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(55, 14, 'Alberta.', 0, '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(56, 14, 'Nova Scotia.', 0, '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(57, 15, 'British settlers in Ontario.', 0, '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(58, 15, 'Descendants of French colonists who settled in what are now the Maritime provinces.', 1, '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(59, 15, 'Inuit communities in Nunavut.', 0, '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(60, 15, 'Recent immigrants from France.', 0, '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(61, 16, 'A person whose first language is English.', 1, '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(62, 16, 'A person whose first language is French.', 0, '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(63, 16, 'A person from England only.', 0, '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(64, 16, 'A person who speaks an Indigenous language.', 0, '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(65, 17, 'Bilingual Canadians.', 0, '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(66, 17, 'Allophones.', 1, '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(67, 17, 'New Canadians.', 0, '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(68, 17, 'Anglophones.', 0, '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(69, 18, 'The joining of provinces to create a new country.', 1, '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(70, 18, 'The signing of a peace treaty with the United States.', 0, '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(71, 18, 'The arrival of the first European explorers.', 0, '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(72, 18, 'The establishment of the Canadian Pacific Railway.', 0, '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(73, 19, '1812.', 0, '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(74, 19, '1867.', 1, '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(75, 19, '1905.', 0, '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(76, 19, '1982.', 0, '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(77, 20, 'Sir Wilfrid Laurier.', 0, '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(78, 20, 'Sir John A. Macdonald.', 1, '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(79, 20, 'Sir George-Étienne Cartier.', 0, '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(80, 20, 'Sir Louis-Hippolyte La Fontaine.', 0, '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(81, 21, 'Government where the prime minister must be elected directly by the people.', 0, '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(82, 21, 'Government where ministers of the Crown must have the support of a majority of elected representatives.', 1, '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(83, 21, 'Government that takes responsibility for all citizens\' welfare.', 0, '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(84, 21, 'Government where the Queen makes all decisions.', 0, '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(85, 22, 'A British general at the Battle of the Plains of Abraham.', 0, '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(86, 22, 'A champion of French language rights and the first head of a responsible government in Canada (1849).', 1, '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(87, 22, 'The founder of the Hudson\'s Bay Company.', 0, '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(88, 22, 'The leader of the Métis people at Batoche.', 0, '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(89, 23, 'Canada\'s commitment to international trade only.', 0, '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(90, 23, 'Unity and a country united by rail from sea to sea.', 1, '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(91, 23, 'British military strength in North America.', 0, '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(92, 23, 'The defeat of Indigenous peoples.', 0, '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(93, 24, 'It created a new export industry for Canada.', 0, '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(94, 24, 'It saved millions of lives from diabetes worldwide.', 1, '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(95, 24, 'It started the Canadian medical school system.', 0, '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(96, 24, 'It led to Canada\'s independence from Britain.', 0, '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(97, 25, 'Sir John A. Macdonald.', 0, '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(98, 25, 'Sir Isaac Brock and Chief Tecumseh.', 1, '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(99, 25, 'Louis Riel.', 0, '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(100, 25, 'Sir Wilfrid Laurier.', 0, '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(101, 26, 'The Battle of the Somme.', 0, '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(102, 26, 'The Battle of Vimy Ridge.', 1, '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(103, 26, 'The Battle of Britain.', 0, '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(104, 26, 'The Battle of Dieppe.', 0, '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(105, 27, 'Canada played no significant role.', 0, '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(106, 27, 'More than one million Canadians served, including the D-Day landing at Juno Beach in 1944.', 1, '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(107, 27, 'Canada only sent supplies, not troops.', 0, '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(108, 27, 'Canada remained neutral throughout the war.', 0, '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(109, 28, 'John Cabot.', 0, '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(110, 28, 'Jacques Cartier.', 1, '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(111, 28, 'Samuel de Champlain.', 0, '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(112, 28, 'Henry Hudson.', 0, '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(113, 29, 'Jacques Cartier.', 0, '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(114, 29, 'Samuel de Champlain.', 1, '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(115, 29, 'Sir John A. Macdonald.', 0, '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(116, 29, 'Louis Riel.', 0, '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(117, 30, 'Ontario.', 0, '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(118, 30, 'Quebec.', 0, '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(119, 30, 'Manitoba.', 1, '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(120, 30, 'British Columbia.', 0, '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(121, 31, '1867.', 0, '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(122, 31, '1965.', 0, '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(123, 31, '1982.', 1, '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(124, 31, '2001.', 0, '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(125, 32, '1867.', 0, '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(126, 32, '1965.', 1, '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(127, 32, '1982.', 0, '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(128, 32, '2001.', 0, '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(129, 33, 'Sir Wilfrid Laurier.', 0, '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(130, 33, 'Tommy Douglas.', 1, '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(131, 33, 'John Diefenbaker.', 0, '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(132, 33, 'Pierre Trudeau.', 0, '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(133, 34, 'John Diefenbaker.', 1, '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(134, 34, 'Lester B. Pearson.', 0, '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(135, 34, 'Pierre Trudeau.', 0, '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(136, 34, 'Tommy Douglas.', 0, '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(137, 35, 'The monarch makes all the laws.', 0, '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(138, 35, 'Canada\'s head of state is a hereditary Sovereign who reigns in accordance with the Constitution.', 1, '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(139, 35, 'Canada has no monarchy.', 0, '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(140, 35, 'The Prime Minister is the King or Queen.', 0, '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(141, 36, 'Federal, provincial and municipal.', 0, '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(142, 36, 'Executive, legislative and judicial.', 1, '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(143, 36, 'Liberal, Conservative and NDP.', 0, '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(144, 36, 'House of Commons, Senate and Cabinet.', 0, '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(145, 37, 'The Queen makes laws; the PM enforces them.', 0, '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(146, 37, 'The Queen is head of state; the Prime Minister is head of government.', 1, '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(147, 37, 'There is no difference — they share the same role.', 0, '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(148, 37, 'The Queen is elected; the PM is appointed.', 0, '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(149, 38, 'Federal, provincial/territorial and municipal.', 1, '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(150, 38, 'Executive, legislative and judicial.', 0, '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(151, 38, 'Monarchy, Parliament and Courts.', 0, '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(152, 38, 'Cabinet, House of Commons and Senate.', 0, '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(153, 39, 'The Prime Minister, the Cabinet and the courts.', 0, '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(154, 39, 'The Sovereign (Queen or King), the Senate and the House of Commons.', 1, '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(155, 39, 'The provinces, the territories and the federal government.', 0, '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(156, 39, 'Liberals, Conservatives and Independents.', 0, '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(157, 40, 'They are elected by voters.', 0, '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(158, 40, 'They are appointed by the Governor General on the advice of the Prime Minister.', 1, '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(159, 40, 'They are appointed by the Queen.', 0, '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(160, 40, 'They inherit their seats.', 0, '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(161, 41, 'They are appointed by the United Nations.', 0, '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(162, 41, 'They are chosen by the provincial premiers.', 0, '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(163, 41, 'They are elected by voters in their local constituency (riding).', 1, '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(164, 41, 'They are elected by landowners and police chiefs.', 0, '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(165, 42, 'Only Canadian-born citizens.', 0, '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(166, 42, 'Canadian citizens aged 18 or older.', 1, '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(167, 42, 'Permanent residents and citizens.', 0, '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(168, 42, 'Any resident of Canada over 16.', 0, '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(169, 43, 'Yes — you must tell your employer.', 0, '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(170, 43, 'Yes — you must tell your spouse.', 0, '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(171, 43, 'No — your vote is secret.', 1, '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(172, 43, 'Yes — you must inform Elections Canada.', 0, '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(173, 44, 'The party with the most senators.', 0, '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(174, 44, 'The party with the most elected representatives (MPs) in the House of Commons.', 1, '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(175, 44, 'The party chosen by the Senate.', 0, '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(176, 44, 'The party that wins the popular vote in Quebec.', 0, '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(177, 45, 'Announce loudly who you are voting for.', 0, '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(178, 45, 'Provide proof of identity and address, then mark an X on the ballot beside one candidate\'s name.', 1, '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(179, 45, 'Sign your name beside your chosen candidate on a public list.', 0, '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(180, 45, 'Tell the official who you want to vote for and they will mark the ballot.', 0, '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(181, 46, 'When one party holds at least half the seats in the House of Commons.', 1, '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(182, 46, 'When the party in power wins less than half the seats.', 0, '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(183, 46, 'When the Senate has more members than the House.', 0, '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(184, 46, 'When the Prime Minister is elected directly by the people.', 0, '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(185, 47, 'To make new laws.', 0, '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(186, 47, 'To settle disputes and decide whether someone has broken a law.', 1, '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(187, 47, 'To elect government leaders.', 0, '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(188, 47, 'To replace the Senate.', 0, '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(189, 48, 'No — questioning the police is illegal.', 0, '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(190, 48, 'Yes — the police are there to keep people safe and enforce the law, and you can question their conduct.', 1, '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(191, 48, 'Only with a written court order.', 0, '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(192, 48, 'Only if you are a lawyer.', 0, '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(193, 49, 'The Federal Court of Appeal.', 0, '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(194, 49, 'The Supreme Court of Canada.', 1, '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(195, 49, 'The Ontario Court of Appeal.', 0, '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(196, 49, 'The House of Commons.', 0, '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(197, 50, 'The Prime Minister is above the law.', 0, '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(198, 50, 'Everyone, including the police and government, is subject to the same laws.', 1, '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(199, 50, 'Only judges interpret the law.', 0, '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(200, 50, 'Citizens may obey only laws they agree with.', 0, '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(201, 51, 'Everyone charged with an offence.', 1, '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(202, 51, 'Only Canadian citizens.', 0, '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(203, 51, 'Only those who can afford a lawyer.', 0, '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(204, 51, 'Only first-time offenders.', 0, '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(205, 52, 'To remember our Sovereign, Queen Elizabeth II.', 0, '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(206, 52, 'To celebrate Confederation.', 0, '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(207, 52, 'To honour prime ministers who have died.', 0, '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(208, 52, 'To remember the sacrifice of Canadians who have served or died in wars up to the present day.', 1, '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(209, 53, 'The Order of Canada.', 0, '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(210, 53, 'The Victoria Cross (V.C.).', 1, '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(211, 53, 'The Order of Military Merit.', 0, '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(212, 53, 'The Maple Leaf Award.', 0, '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(213, 54, 'God Save the Queen.', 0, '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(214, 54, 'O Canada.', 1, '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(215, 54, 'The Maple Leaf Forever.', 0, '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(216, 54, 'Land of Hope and Glory.', 0, '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(217, 55, 'O Canada.', 0, '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(218, 55, 'God Save the Queen (or King).', 1, '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(219, 55, 'Rule, Britannia!', 0, '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(220, 55, 'The Maple Leaf Forever.', 0, '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(221, 56, 'The bald eagle and the Statue of Liberty.', 0, '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(222, 56, 'The Canadian flag (Maple Leaf) and the beaver.', 1, '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(223, 56, 'The cherry blossom and the kangaroo.', 0, '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(224, 56, 'The shamrock and the unicorn.', 0, '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(225, 57, 'It was chosen by Queen Victoria.', 0, '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(226, 57, 'It represents the fur trade that shaped Canada\'s early economy.', 1, '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(227, 57, 'It is the national animal of France.', 0, '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(228, 57, 'It is featured on the Canadian flag.', 0, '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(229, 58, 'Mining, fishing and farming.', 0, '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(230, 58, 'Service industries, manufacturing industries and natural resources industries.', 1, '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(231, 58, 'Banking, technology and tourism.', 0, '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(232, 58, 'Aerospace, forestry and oil.', 0, '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(233, 59, 'The United Kingdom.', 0, '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(234, 59, 'The United States.', 1, '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(235, 59, 'China.', 0, '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(236, 59, 'France.', 0, '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(237, 60, 'The Canadian pound.', 0, '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(238, 60, 'The Canadian dollar.', 1, '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(239, 60, 'The Canadian franc.', 0, '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(240, 60, 'The Canadian peso.', 0, '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(241, 61, 'Quebec and Ontario.', 0, '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(242, 61, 'Newfoundland and Labrador, Prince Edward Island, Nova Scotia, and New Brunswick.', 1, '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(243, 61, 'Manitoba, Saskatchewan, and Alberta.', 0, '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(244, 61, 'British Columbia and Yukon.', 0, '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(245, 62, 'British Columbia, Alberta, and Yukon.', 0, '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(246, 62, 'Manitoba, Saskatchewan, and Alberta.', 1, '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(247, 62, 'Ontario, Manitoba, and Saskatchewan.', 0, '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(248, 62, 'Alberta, Saskatchewan, and Northwest Territories.', 0, '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(249, 63, 'Manitoba and Saskatchewan.', 0, '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(250, 63, 'Quebec and Ontario.', 1, '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(251, 63, 'Nova Scotia and New Brunswick.', 0, '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(252, 63, 'British Columbia and Alberta.', 0, '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(253, 64, 'Yukon, Northwest Territories, and Nunavut.', 1, '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(254, 64, 'Newfoundland, Labrador, and Nunavut.', 0, '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(255, 64, 'Yukon, Alaska, and Greenland.', 0, '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(256, 64, 'Quebec, Manitoba, and Yukon.', 0, '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(257, 65, 'Toronto.', 0, '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(258, 65, 'Montreal.', 0, '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(259, 65, 'Ottawa.', 1, '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(260, 65, 'Vancouver.', 0, '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(261, 66, 'Vancouver.', 0, '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(262, 66, 'Victoria.', 1, '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(263, 66, 'Kelowna.', 0, '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(264, 66, 'Surrey.', 0, '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(265, 67, '10 provinces and 3 territories.', 1, '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(266, 67, '13 provinces and 0 territories.', 0, '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(267, 67, '12 provinces and 1 territory.', 0, '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(268, 67, '10 provinces and 5 territories.', 0, '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(269, 68, '1949.', 0, '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(270, 68, '1982.', 0, '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(271, 68, '1999.', 1, '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(272, 68, '2005.', 0, '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(273, 69, 'An oral interview only.', 0, '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(274, 69, 'A written test, but it could be an interview.', 1, '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(275, 69, 'A take-home essay.', 0, '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(276, 69, 'A multiple-day exam.', 0, '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(277, 70, '45 and over.', 0, '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(278, 70, '50 and over.', 0, '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(279, 70, '55 and over.', 1, '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(280, 70, '65 and over.', 0, '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(281, 71, 'You take an exam.', 0, '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(282, 71, 'You take the Oath of Citizenship, sign the oath form, and receive your Canadian Citizenship Certificate.', 1, '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(283, 71, 'You apply for a passport.', 0, '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(284, 71, 'You vote in a federal election.', 0, '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(285, 72, '10 out of 20 (50%).', 0, '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(286, 72, '12 out of 20 (60%).', 0, '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(287, 72, '15 out of 20 (75%).', 1, '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(288, 72, '18 out of 20 (90%).', 0, '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(289, 73, 'Adequate knowledge of English or French.', 1, '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(290, 73, 'Ability to recite all provincial capitals from memory.', 0, '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(291, 73, 'Personal financial standing.', 0, '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(292, 73, 'Membership in a Canadian political party.', 0, '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(293, 74, 'The Constitution Act, 1867.', 0, '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(294, 74, 'Magna Carta (1215).', 1, '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(295, 74, 'The Treaty of Paris (1763).', 0, '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(296, 74, 'The Statute of Westminster (1931).', 0, '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(297, 75, 'At least every two years.', 0, '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(298, 75, 'At least every five years.', 1, '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(299, 75, 'At least every ten years.', 0, '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(300, 75, 'Only when the Prime Minister decides.', 0, '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(301, 76, 'Yes — all citizens must serve at age 18.', 0, '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(302, 76, 'Yes — only male citizens must serve.', 0, '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(303, 76, 'No — service is voluntary, but seen as a noble way to contribute.', 1, '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(304, 76, 'No — citizens are forbidden from serving.', 0, '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(305, 77, 'Only those of First Nations.', 0, '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(306, 77, 'First Nations, Métis and Inuit peoples.', 1, '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(307, 77, 'Only Métis on the Prairies.', 0, '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(308, 77, 'Only Inuit in Nunavut.', 0, '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(309, 78, 'The Prime Minister makes the laws alone.', 0, '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(310, 78, 'The law applies equally to everyone, including governments and the police.', 1, '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(311, 78, 'Only judges are bound by the law.', 0, '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(312, 78, 'Citizens may choose which laws to obey.', 0, '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(313, 79, 'Inuktitut.', 0, '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(314, 79, 'Cree.', 0, '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(315, 79, 'Michif.', 1, '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(316, 79, 'Joual.', 0, '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(317, 80, '1982.', 0, '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(318, 80, '1996.', 0, '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(319, 80, '2008.', 1, '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(320, 80, '2015.', 0, '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(321, 81, 'About one third.', 0, '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(322, 81, 'About half.', 0, '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(323, 81, 'About two thirds (around 65%).', 1, '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(324, 81, 'Over 90%.', 0, '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(325, 82, 'On the Prairies.', 0, '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(326, 82, 'In small, scattered communities across the Arctic.', 1, '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(327, 82, 'In the Maritime provinces.', 0, '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(328, 82, 'In Southern Ontario.', 0, '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(329, 83, 'About 1 million.', 0, '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(330, 83, 'About 4 million.', 0, '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(331, 83, 'About 7 million.', 1, '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(332, 83, 'About 18 million.', 0, '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(333, 84, 'About 7 million.', 0, '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(334, 84, 'About 12 million.', 0, '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(335, 84, 'About 18 million.', 1, '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(336, 84, 'About 25 million.', 0, '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(337, 85, 'The Spanish.', 0, '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(338, 85, 'The Norse Vikings.', 1, '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(339, 85, 'The Portuguese.', 0, '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(340, 85, 'The Dutch.', 0, '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(341, 86, 'Jacques Cartier.', 0, '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(342, 86, 'John Cabot.', 1, '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(343, 86, 'Henry Hudson.', 0, '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(344, 86, 'Samuel de Champlain.', 0, '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(345, 87, '1608.', 0, '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(346, 87, '1663.', 1, '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(347, 87, '1670.', 0, '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(348, 87, '1759.', 0, '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(349, 88, 'Wolfe (British) and Montcalm (French).', 1, '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(350, 88, 'Brock (British) and Tecumseh (Shawnee).', 0, '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(351, 88, 'Carleton (British) and Laval (French).', 0, '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(352, 88, 'Macdonald (British) and Riel (Métis).', 0, '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(353, 89, 'Banned the French language in Quebec.', 0, '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(354, 89, 'Allowed religious freedom for Catholics and restored French civil law.', 1, '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(355, 89, 'Created the Province of Canada.', 0, '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(356, 89, 'Brought Confederation to Canada.', 0, '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(357, 90, 'British soldiers who refused to fight at Quebec.', 0, '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(358, 90, 'Settlers who came to Canada from France after the British conquest.', 0, '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(359, 90, 'Americans loyal to the Crown who fled to Canada during and after the American Revolution.', 1, '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(360, 90, 'Members of the United Empire of the Hudson\'s Bay Company.', 0, '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(361, 91, 'Laura Secord.', 1, '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(362, 91, 'Nellie McClung.', 0, '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(363, 91, 'Emily Carr.', 0, '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(364, 91, 'Madeleine de Verchères.', 0, '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(365, 92, 'The $5 bill.', 0, '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(366, 92, 'The $10 bill.', 1, '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(367, 92, 'The $20 bill.', 0, '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(368, 92, 'The $50 bill.', 0, '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(369, 93, 'The $5 bill.', 1, '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(370, 93, 'The $10 bill.', 0, '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(371, 93, 'The $20 bill.', 0, '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(372, 93, 'The $100 bill.', 0, '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(373, 94, '1867.', 0, '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(374, 94, '1905.', 0, '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(375, 94, '1931.', 0, '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(376, 94, '1949.', 1, '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(377, 95, 'Created the Province of Quebec.', 0, '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(378, 95, 'Made Canada legally autonomous from Britain, except for amending the Constitution.', 1, '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(379, 95, 'Abolished the monarchy in Canada.', 0, '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(380, 95, 'Joined Newfoundland to Canada.', 0, '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(381, 96, 'World War II.', 0, '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(382, 96, 'The Suez Crisis.', 0, '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(383, 96, 'The Korean War.', 1, '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(384, 96, 'The Vietnam War.', 0, '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(385, 97, 'General Sir Arthur Currie.', 1, '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(386, 97, 'General Sir Isaac Brock.', 0, '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(387, 97, 'General Wolfe.', 0, '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(388, 97, 'General Sam Hughes.', 0, '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(389, 98, '1971.', 0, '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(390, 98, '1982.', 0, '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(391, 98, '1988.', 1, '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(392, 98, '1999.', 0, '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(393, 99, '1918.', 0, '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(394, 99, '1949.', 0, '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(395, 99, '1960.', 1, '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(396, 99, '1982.', 0, '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(397, 100, '1867.', 0, '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(398, 100, '1949.', 0, '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(399, 100, '1969.', 1, '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(400, 100, '1982.', 0, '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(401, 101, '1980.', 0, '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(402, 101, '1982.', 0, '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(403, 101, '1992.', 0, '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(404, 101, '1995.', 1, '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(405, 102, 'July 1.', 0, '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(406, 102, 'February 15.', 1, '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(407, 102, 'November 11.', 0, '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(408, 102, 'September 17.', 0, '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(409, 103, 'Education.', 0, '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(410, 103, 'Healthcare delivery.', 0, '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(411, 103, 'National defence, foreign policy and citizenship.', 1, '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(412, 103, 'Property and civil rights.', 0, '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(413, 104, 'Foreign policy.', 0, '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(414, 104, 'National defence.', 0, '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(415, 104, 'Education and healthcare.', 1, '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(416, 104, 'Currency.', 0, '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(417, 105, 'The Premier.', 0, '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(418, 105, 'The Lieutenant Governor.', 1, '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(419, 105, 'The Speaker of the Legislative Assembly.', 0, '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(420, 105, 'The Chief Justice.', 0, '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(421, 106, 'Prime Minister.', 0, '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(422, 106, 'Premier.', 1, '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(423, 106, 'Mayor.', 0, '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(424, 106, 'Governor.', 0, '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(425, 107, '65.', 0, '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(426, 107, '70.', 0, '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(427, 107, '75.', 1, '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(428, 107, '80.', 0, '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(429, 108, 'The Governor General.', 0, '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(430, 108, 'The Senate.', 0, '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(431, 108, 'The Prime Minister.', 1, '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(432, 108, 'The Supreme Court.', 0, '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(433, 109, 'A ward.', 0, '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(434, 109, 'A riding (constituency).', 1, '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(435, 109, 'A canton.', 0, '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(436, 109, 'A precinct.', 0, '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(437, 110, 'Your identity and your address.', 1, '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(438, 110, 'Your income for the past year.', 0, '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(439, 110, 'Your party membership.', 0, '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(440, 110, 'Your country of origin.', 0, '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(441, 111, 'MPs (Members of Parliament).', 0, '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(442, 111, 'MLAs (Members of the Legislative Assembly).', 0, '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(443, 111, 'MNAs (Members of the National Assembly).', 1, '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(444, 111, 'MPPs (Members of Provincial Parliament).', 0, '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(445, 112, 'MPs.', 0, '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(446, 112, 'MPPs (Members of Provincial Parliament).', 1, '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(447, 112, 'MLAs.', 0, '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(448, 112, 'MNAs.', 0, '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(449, 113, 'The Prime Minister.', 0, '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(450, 113, 'Senators.', 0, '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(451, 113, 'Mayors and councillors.', 1, '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(452, 113, 'Lieutenant Governors.', 0, '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(453, 114, 'To remain silent and to retain a lawyer (and have one without charge if you cannot afford one through legal aid).', 1, '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(454, 114, 'To be released within 24 hours, no matter the charge.', 0, '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(455, 114, 'To represent yourself only.', 0, '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(456, 114, 'To be tried within 30 days, automatically.', 0, '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(457, 115, 'Royal Canadian Military Police.', 0, '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(458, 115, 'Royal Canadian Mounted Police.', 1, '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(459, 115, 'Royal Crown Municipal Police.', 0, '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(460, 115, 'Regional Canadian Marine Patrol.', 0, '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(461, 116, 'Ontario and Quebec.', 1, '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(462, 116, 'Alberta and British Columbia.', 0, '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(463, 116, 'Manitoba and Saskatchewan.', 0, '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(464, 116, 'Nova Scotia and New Brunswick.', 0, '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(465, 117, 'July 1, 1867.', 0, '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(466, 117, 'February 15, 1965.', 1, '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(467, 117, 'April 9, 1917.', 0, '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(468, 117, 'November 11, 1918.', 0, '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(469, 118, 'Canada\'s parliamentary democracy and government.', 1, '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(470, 118, 'Independence from Britain.', 0, '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(471, 118, 'The federal court system.', 0, '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(472, 118, 'The Canadian Forces.', 0, '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(473, 119, 'E pluribus unum.', 0, '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(474, 119, 'A mari usque ad mare (From sea to sea).', 1, '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(475, 119, 'Peace, order and good government.', 0, '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(476, 119, 'Je me souviens.', 0, '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(477, 120, 'Calixa Lavallée.', 1, '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(478, 120, 'Adolphe-Basile Routhier.', 0, '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(479, 120, 'Robert Stanley Weir.', 0, '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(480, 120, 'Glenn Gould.', 0, '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(481, 121, '1880.', 0, '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(482, 121, '1908.', 0, '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(483, 121, '1965.', 0, '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(484, 121, '1980.', 1, '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(485, 122, 'Curling.', 0, '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(486, 122, 'Hockey.', 1, '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(487, 122, 'Skiing.', 0, '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(488, 122, 'Lacrosse.', 0, '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(489, 123, 'Baseball.', 0, '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(490, 123, 'Soccer.', 0, '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(491, 123, 'Lacrosse.', 1, '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(492, 123, 'Rugby.', 0, '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(493, 124, 'July 1.', 0, '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(494, 124, 'September 17.', 0, '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(495, 124, 'November 11.', 1, '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(496, 124, 'December 6.', 0, '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(497, 125, '1949.', 0, '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(498, 125, '1967.', 1, '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(499, 125, '1982.', 0, '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(500, 125, '1999.', 0, '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(501, 126, 'The Bank of Canada.', 0, '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(502, 126, 'The Royal Canadian Mint.', 1, '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(503, 126, 'The Toronto Stock Exchange.', 0, '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(504, 126, 'The Department of Finance.', 0, '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(505, 127, 'The Royal Bank of Canada.', 0, '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(506, 127, 'The Bank of Montreal.', 0, '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(507, 127, 'The Bank of Canada.', 1, '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(508, 127, 'The Federal Reserve of Canada.', 0, '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(509, 128, 'The G7.', 1, '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(510, 128, 'ASEAN.', 0, '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(511, 128, 'Mercosur.', 0, '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(512, 128, 'OPEC.', 0, '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(513, 129, 'Natural resources.', 0, '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(514, 129, 'Manufacturing.', 0, '2026-06-03 09:56:18', '2026-06-03 09:56:18'),
(515, 129, 'Service industries.', 1, '2026-06-03 09:56:19', '2026-06-03 09:56:19'),
(516, 129, 'Agriculture.', 0, '2026-06-03 09:56:19', '2026-06-03 09:56:19'),
(517, 130, 'Charlottetown.', 0, '2026-06-03 09:56:19', '2026-06-03 09:56:19'),
(518, 130, 'Halifax.', 0, '2026-06-03 09:56:19', '2026-06-03 09:56:19'),
(519, 130, 'St. John\'s.', 1, '2026-06-03 09:56:19', '2026-06-03 09:56:19'),
(520, 130, 'Fredericton.', 0, '2026-06-03 09:56:19', '2026-06-03 09:56:19'),
(521, 131, 'Summerside.', 0, '2026-06-03 09:56:19', '2026-06-03 09:56:19'),
(522, 131, 'Charlottetown.', 1, '2026-06-03 09:56:19', '2026-06-03 09:56:19'),
(523, 131, 'Halifax.', 0, '2026-06-03 09:56:19', '2026-06-03 09:56:19'),
(524, 131, 'Saint John.', 0, '2026-06-03 09:56:19', '2026-06-03 09:56:19'),
(525, 132, 'Sydney.', 0, '2026-06-03 09:56:19', '2026-06-03 09:56:19'),
(526, 132, 'Halifax.', 1, '2026-06-03 09:56:19', '2026-06-03 09:56:19'),
(527, 132, 'Yarmouth.', 0, '2026-06-03 09:56:19', '2026-06-03 09:56:19'),
(528, 132, 'Truro.', 0, '2026-06-03 09:56:19', '2026-06-03 09:56:19'),
(529, 133, 'Saint John.', 0, '2026-06-03 09:56:19', '2026-06-03 09:56:19'),
(530, 133, 'Moncton.', 0, '2026-06-03 09:56:19', '2026-06-03 09:56:19'),
(531, 133, 'Fredericton.', 1, '2026-06-03 09:56:19', '2026-06-03 09:56:19'),
(532, 133, 'Bathurst.', 0, '2026-06-03 09:56:19', '2026-06-03 09:56:19'),
(533, 134, 'Quebec.', 0, '2026-06-03 09:56:19', '2026-06-03 09:56:19'),
(534, 134, 'Nova Scotia.', 0, '2026-06-03 09:56:19', '2026-06-03 09:56:19'),
(535, 134, 'New Brunswick.', 1, '2026-06-03 09:56:19', '2026-06-03 09:56:19'),
(536, 134, 'Ontario.', 0, '2026-06-03 09:56:19', '2026-06-03 09:56:19'),
(537, 135, 'Montreal.', 0, '2026-06-03 09:56:19', '2026-06-03 09:56:19'),
(538, 135, 'Quebec City.', 1, '2026-06-03 09:56:19', '2026-06-03 09:56:19'),
(539, 135, 'Laval.', 0, '2026-06-03 09:56:19', '2026-06-03 09:56:19'),
(540, 135, 'Sherbrooke.', 0, '2026-06-03 09:56:19', '2026-06-03 09:56:19'),
(541, 136, 'Toronto.', 1, '2026-06-03 09:56:19', '2026-06-03 09:56:19'),
(542, 136, 'Ottawa.', 0, '2026-06-03 09:56:19', '2026-06-03 09:56:19'),
(543, 136, 'Hamilton.', 0, '2026-06-03 09:56:19', '2026-06-03 09:56:19'),
(544, 136, 'Kingston.', 0, '2026-06-03 09:56:19', '2026-06-03 09:56:19'),
(545, 137, 'Brandon.', 0, '2026-06-03 09:56:19', '2026-06-03 09:56:19'),
(546, 137, 'Winnipeg.', 1, '2026-06-03 09:56:19', '2026-06-03 09:56:19'),
(547, 137, 'Thompson.', 0, '2026-06-03 09:56:19', '2026-06-03 09:56:19'),
(548, 137, 'Steinbach.', 0, '2026-06-03 09:56:19', '2026-06-03 09:56:19'),
(549, 138, 'Saskatoon.', 0, '2026-06-03 09:56:19', '2026-06-03 09:56:19'),
(550, 138, 'Regina.', 1, '2026-06-03 09:56:19', '2026-06-03 09:56:19'),
(551, 138, 'Prince Albert.', 0, '2026-06-03 09:56:19', '2026-06-03 09:56:19'),
(552, 138, 'Moose Jaw.', 0, '2026-06-03 09:56:19', '2026-06-03 09:56:19'),
(553, 139, 'Calgary.', 0, '2026-06-03 09:56:19', '2026-06-03 09:56:19'),
(554, 139, 'Edmonton.', 1, '2026-06-03 09:56:19', '2026-06-03 09:56:19'),
(555, 139, 'Red Deer.', 0, '2026-06-03 09:56:19', '2026-06-03 09:56:19'),
(556, 139, 'Lethbridge.', 0, '2026-06-03 09:56:19', '2026-06-03 09:56:19'),
(557, 140, 'Dawson City.', 0, '2026-06-03 09:56:19', '2026-06-03 09:56:19'),
(558, 140, 'Whitehorse.', 1, '2026-06-03 09:56:19', '2026-06-03 09:56:19'),
(559, 140, 'Watson Lake.', 0, '2026-06-03 09:56:19', '2026-06-03 09:56:19'),
(560, 140, 'Faro.', 0, '2026-06-03 09:56:19', '2026-06-03 09:56:19'),
(561, 141, 'Inuvik.', 0, '2026-06-03 09:56:19', '2026-06-03 09:56:19'),
(562, 141, 'Hay River.', 0, '2026-06-03 09:56:19', '2026-06-03 09:56:19'),
(563, 141, 'Yellowknife.', 1, '2026-06-03 09:56:19', '2026-06-03 09:56:19'),
(564, 141, 'Fort Smith.', 0, '2026-06-03 09:56:19', '2026-06-03 09:56:19'),
(565, 142, 'Iqaluit.', 1, '2026-06-03 09:56:19', '2026-06-03 09:56:19'),
(566, 142, 'Rankin Inlet.', 0, '2026-06-03 09:56:19', '2026-06-03 09:56:19');
INSERT INTO `question_options` (`id`, `question_id`, `option_text`, `is_correct`, `created_at`, `updated_at`) VALUES
(567, 142, 'Cambridge Bay.', 0, '2026-06-03 09:56:19', '2026-06-03 09:56:19'),
(568, 142, 'Arviat.', 0, '2026-06-03 09:56:19', '2026-06-03 09:56:19'),
(569, 143, 'Port of Halifax.', 0, '2026-06-03 09:56:19', '2026-06-03 09:56:19'),
(570, 143, 'Port of Montreal.', 0, '2026-06-03 09:56:19', '2026-06-03 09:56:19'),
(571, 143, 'Port of Vancouver.', 1, '2026-06-03 09:56:19', '2026-06-03 09:56:19'),
(572, 143, 'Port of Saint John.', 0, '2026-06-03 09:56:19', '2026-06-03 09:56:19'),
(573, 144, 'Quebec City.', 1, '2026-06-03 09:56:19', '2026-06-03 09:56:19'),
(574, 144, 'Montreal.', 0, '2026-06-03 09:56:19', '2026-06-03 09:56:19'),
(575, 144, 'Halifax.', 0, '2026-06-03 09:56:19', '2026-06-03 09:56:19'),
(576, 144, 'Kingston.', 0, '2026-06-03 09:56:19', '2026-06-03 09:56:19'),
(577, 145, 'Queen Victoria.', 1, '2026-06-03 09:56:19', '2026-06-03 09:56:19'),
(578, 145, 'Sir John A. Macdonald.', 0, '2026-06-03 09:56:19', '2026-06-03 09:56:19'),
(579, 145, 'Lord Durham.', 0, '2026-06-03 09:56:19', '2026-06-03 09:56:19'),
(580, 145, 'Queen Elizabeth II.', 0, '2026-06-03 09:56:19', '2026-06-03 09:56:19');

-- --------------------------------------------------------

--
-- Table structure for table `settings`
--

CREATE TABLE `settings` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `theme_style` enum('light','dark','system') NOT NULL DEFAULT 'system',
  `language_id` int(11) DEFAULT NULL,
  `province_id` int(11) DEFAULT NULL,
  `test_date` date DEFAULT NULL,
  `result` varchar(255) DEFAULT NULL,
  `reset_status` tinyint(1) NOT NULL DEFAULT 0,
  `status` enum('active','inactive') NOT NULL DEFAULT 'active',
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `settings`
--

INSERT INTO `settings` (`id`, `user_id`, `theme_style`, `language_id`, `province_id`, `test_date`, `result`, `reset_status`, `status`, `created_at`, `updated_at`) VALUES
(3, 5, 'system', 1, 9, NULL, '41', 0, 'active', '2026-06-03 16:24:02', '2026-06-03 16:24:02'),
(4, 11, 'system', 7, 14, '2026-06-03', '50', 0, 'active', '2026-06-03 16:32:01', '2026-06-03 18:49:12'),
(5, 13, 'system', 1, 11, NULL, '50', 0, 'active', '2026-06-03 17:01:15', '2026-06-04 11:49:00'),
(7, 16, 'system', 1, 2, '2026-06-04', '55', 0, 'active', '2026-06-04 21:46:47', '2026-06-04 21:46:47');

-- --------------------------------------------------------

--
-- Table structure for table `site_contacts`
--

CREATE TABLE `site_contacts` (
  `id` int(11) NOT NULL,
  `email` varchar(255) DEFAULT NULL,
  `phone` varchar(100) DEFAULT NULL,
  `address` text DEFAULT NULL,
  `facebook` varchar(500) DEFAULT NULL,
  `twitter` varchar(500) DEFAULT NULL,
  `instagram` varchar(500) DEFAULT NULL,
  `linkedin` varchar(500) DEFAULT NULL,
  `youtube` varchar(500) DEFAULT NULL,
  `whatsapp` varchar(100) DEFAULT NULL,
  `status` enum('active','inactive') NOT NULL DEFAULT 'active',
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `site_contacts`
--

INSERT INTO `site_contacts` (`id`, `email`, `phone`, `address`, `facebook`, `twitter`, `instagram`, `linkedin`, `youtube`, `whatsapp`, `status`, `created_at`, `updated_at`) VALUES
(1, 'support@passpilot.ca', '+1 (800) 123-4567', 'Toronto, Ontario, Canada', NULL, NULL, NULL, NULL, NULL, NULL, 'active', '2026-06-04 17:45:21', '2026-06-04 17:45:21');

-- --------------------------------------------------------

--
-- Table structure for table `subscriptions`
--

CREATE TABLE `subscriptions` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `pricing_plan_id` int(11) NOT NULL,
  `start_date` date DEFAULT NULL,
  `end_date` date DEFAULT NULL,
  `payment_status` enum('pending','paid','failed','cancelled') NOT NULL DEFAULT 'pending',
  `status` enum('active','inactive','expired','cancelled') NOT NULL DEFAULT 'active',
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `testimonials`
--

CREATE TABLE `testimonials` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `designation` varchar(255) DEFAULT NULL,
  `photo` varchar(500) DEFAULT NULL,
  `review` text NOT NULL,
  `rating` decimal(2,1) NOT NULL DEFAULT 5.0,
  `status` enum('active','inactive') NOT NULL DEFAULT 'active',
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `testimonials`
--

INSERT INTO `testimonials` (`id`, `name`, `designation`, `photo`, `review`, `rating`, `status`, `created_at`, `updated_at`) VALUES
(1, 'Sarah M.', 'New Canadian Citizen', NULL, 'Passpilot helped me pass my citizenship test on the first try. The practice questions are exactly like the real exam!', 5.0, 'active', '2026-06-03 09:56:19', '2026-06-03 09:56:19'),
(2, 'Ahmed K.', 'Permanent Resident', NULL, 'Great app! I loved the progress tracking and mock exams. Highly recommended for anyone preparing for the test.', 5.0, 'active', '2026-06-03 09:56:19', '2026-06-03 09:56:19'),
(3, 'Maria G.', 'Immigrant from Philippines', NULL, 'The chapter summaries and practice questions made studying so much easier. Thank you Passpilot!', 4.5, 'active', '2026-06-03 09:56:19', '2026-06-03 09:56:19');

-- --------------------------------------------------------

--
-- Table structure for table `test_attempts`
--

CREATE TABLE `test_attempts` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `mock_test_id` int(11) NOT NULL,
  `score` int(11) NOT NULL DEFAULT 0,
  `total_marks` int(11) NOT NULL DEFAULT 0,
  `correct_answers` int(11) NOT NULL DEFAULT 0,
  `wrong_answers` int(11) NOT NULL DEFAULT 0,
  `time_taken` int(11) NOT NULL DEFAULT 0,
  `result` enum('pass','fail') DEFAULT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `test_attempts`
--

INSERT INTO `test_attempts` (`id`, `user_id`, `mock_test_id`, `score`, `total_marks`, `correct_answers`, `wrong_answers`, `time_taken`, `result`, `created_at`, `updated_at`) VALUES
(5, 13, 1, 20, 20, 0, 20, 1460, 'fail', '2026-06-04 11:43:27', '2026-06-04 11:43:27'),
(6, 13, 1, 20, 20, 10, 6, 39, 'pass', '2026-06-04 11:44:19', '2026-06-04 11:47:50'),
(7, 13, 2, 20, 20, 9, 11, 39, 'pass', '2026-06-04 17:36:21', '2026-06-04 17:36:21');

-- --------------------------------------------------------

--
-- Table structure for table `test_attempt_answers`
--

CREATE TABLE `test_attempt_answers` (
  `id` int(11) NOT NULL,
  `attempt_id` int(11) NOT NULL,
  `question_id` int(11) NOT NULL,
  `selected_option` int(11) DEFAULT NULL,
  `is_correct` tinyint(1) NOT NULL DEFAULT 0,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `test_attempt_answers`
--

INSERT INTO `test_attempt_answers` (`id`, `attempt_id`, `question_id`, `selected_option`, `is_correct`, `created_at`, `updated_at`) VALUES
(1, 5, 39, NULL, 0, '2026-06-04 11:43:27', '2026-06-04 11:43:27'),
(2, 5, 26, NULL, 0, '2026-06-04 11:43:27', '2026-06-04 11:43:27'),
(3, 5, 81, NULL, 0, '2026-06-04 11:43:27', '2026-06-04 11:43:27'),
(4, 5, 5, NULL, 0, '2026-06-04 11:43:27', '2026-06-04 11:43:27'),
(5, 5, 130, NULL, 0, '2026-06-04 11:43:27', '2026-06-04 11:43:27'),
(6, 5, 8, NULL, 0, '2026-06-04 11:43:27', '2026-06-04 11:43:27'),
(7, 5, 127, NULL, 0, '2026-06-04 11:43:27', '2026-06-04 11:43:27'),
(8, 5, 59, NULL, 0, '2026-06-04 11:43:27', '2026-06-04 11:43:27'),
(9, 5, 79, NULL, 0, '2026-06-04 11:43:27', '2026-06-04 11:43:27'),
(10, 5, 54, NULL, 0, '2026-06-04 11:43:27', '2026-06-04 11:43:27'),
(11, 5, 61, NULL, 0, '2026-06-04 11:43:27', '2026-06-04 11:43:27'),
(12, 5, 19, NULL, 0, '2026-06-04 11:43:27', '2026-06-04 11:43:27'),
(13, 5, 18, NULL, 0, '2026-06-04 11:43:27', '2026-06-04 11:43:27'),
(14, 5, 55, NULL, 0, '2026-06-04 11:43:27', '2026-06-04 11:43:27'),
(15, 5, 138, NULL, 0, '2026-06-04 11:43:27', '2026-06-04 11:43:27'),
(16, 5, 17, NULL, 0, '2026-06-04 11:43:27', '2026-06-04 11:43:27'),
(17, 5, 53, NULL, 0, '2026-06-04 11:43:27', '2026-06-04 11:43:27'),
(18, 5, 45, NULL, 0, '2026-06-04 11:43:27', '2026-06-04 11:43:27'),
(19, 5, 139, NULL, 0, '2026-06-04 11:43:27', '2026-06-04 11:43:27'),
(20, 5, 124, NULL, 0, '2026-06-04 11:43:27', '2026-06-04 11:43:27'),
(21, 6, 4, 0, 0, '2026-06-04 11:44:19', '2026-06-04 11:44:19'),
(22, 6, 93, 1, 0, '2026-06-04 11:44:19', '2026-06-04 11:44:19'),
(23, 6, 23, 0, 0, '2026-06-04 11:44:19', '2026-06-04 11:44:19'),
(24, 6, 54, 0, 0, '2026-06-04 11:44:19', '2026-06-04 11:44:19'),
(25, 6, 38, 0, 1, '2026-06-04 11:44:19', '2026-06-04 11:44:19'),
(26, 6, 83, 0, 0, '2026-06-04 11:44:19', '2026-06-04 11:44:19'),
(27, 6, 70, 1, 0, '2026-06-04 11:44:19', '2026-06-04 11:44:19'),
(28, 6, 67, 1, 0, '2026-06-04 11:44:19', '2026-06-04 11:44:19'),
(29, 6, 127, 0, 0, '2026-06-04 11:44:19', '2026-06-04 11:44:19'),
(30, 6, 144, 0, 1, '2026-06-04 11:44:19', '2026-06-04 11:44:19'),
(31, 6, 110, 1, 0, '2026-06-04 11:44:19', '2026-06-04 11:44:19'),
(32, 6, 115, 0, 0, '2026-06-04 11:44:19', '2026-06-04 11:44:19'),
(33, 6, 139, 0, 0, '2026-06-04 11:44:19', '2026-06-04 11:44:19'),
(34, 6, 18, 1, 0, '2026-06-04 11:44:19', '2026-06-04 11:44:19'),
(35, 6, 20, 0, 0, '2026-06-04 11:44:19', '2026-06-04 11:44:19'),
(36, 6, 32, 1, 1, '2026-06-04 11:44:19', '2026-06-04 11:44:19'),
(37, 6, 136, 1, 0, '2026-06-04 11:44:19', '2026-06-04 11:44:19'),
(38, 6, 64, 0, 1, '2026-06-04 11:44:19', '2026-06-04 11:44:19'),
(39, 6, 109, 1, 1, '2026-06-04 11:44:19', '2026-06-04 11:44:19'),
(40, 6, 117, 1, 1, '2026-06-04 11:44:19', '2026-06-04 11:44:19'),
(41, 7, 58, 0, 0, '2026-06-04 17:36:21', '2026-06-04 17:36:21'),
(42, 7, 124, 1, 0, '2026-06-04 17:36:21', '2026-06-04 17:36:21'),
(43, 7, 51, 0, 1, '2026-06-04 17:36:21', '2026-06-04 17:36:21'),
(44, 7, 108, 1, 0, '2026-06-04 17:36:21', '2026-06-04 17:36:21'),
(45, 7, 110, 1, 0, '2026-06-04 17:36:21', '2026-06-04 17:36:21'),
(46, 7, 38, 1, 0, '2026-06-04 17:36:21', '2026-06-04 17:36:21'),
(47, 7, 30, 1, 0, '2026-06-04 17:36:21', '2026-06-04 17:36:21'),
(48, 7, 140, 1, 1, '2026-06-04 17:36:21', '2026-06-04 17:36:21'),
(49, 7, 64, 1, 0, '2026-06-04 17:36:21', '2026-06-04 17:36:21'),
(50, 7, 94, 1, 0, '2026-06-04 17:36:21', '2026-06-04 17:36:21'),
(51, 7, 71, 1, 1, '2026-06-04 17:36:21', '2026-06-04 17:36:21'),
(52, 7, 8, 1, 0, '2026-06-04 17:36:21', '2026-06-04 17:36:21'),
(53, 7, 122, 1, 1, '2026-06-04 17:36:21', '2026-06-04 17:36:21'),
(54, 7, 29, 1, 1, '2026-06-04 17:36:21', '2026-06-04 17:36:21'),
(55, 7, 101, 1, 0, '2026-06-04 17:36:21', '2026-06-04 17:36:21'),
(56, 7, 62, 1, 1, '2026-06-04 17:36:21', '2026-06-04 17:36:21'),
(57, 7, 139, 1, 1, '2026-06-04 17:36:21', '2026-06-04 17:36:21'),
(58, 7, 45, 1, 1, '2026-06-04 17:36:21', '2026-06-04 17:36:21'),
(59, 7, 72, 1, 0, '2026-06-04 17:36:21', '2026-06-04 17:36:21'),
(60, 7, 2, 1, 1, '2026-06-04 17:36:21', '2026-06-04 17:36:21');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `full_name` varchar(255) DEFAULT NULL,
  `user_name` varchar(255) DEFAULT NULL,
  `email` varchar(255) NOT NULL,
  `phone` varchar(50) DEFAULT NULL,
  `profile_pic` longtext DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `role` enum('admin','user','customer') NOT NULL DEFAULT 'user',
  `email_verified_at` datetime DEFAULT NULL,
  `phone_verified_at` datetime DEFAULT NULL,
  `status` enum('active','inactive','banned') NOT NULL DEFAULT 'active',
  `last_login_at` datetime DEFAULT NULL,
  `remember_token` varchar(255) DEFAULT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `full_name`, `user_name`, `email`, `phone`, `profile_pic`, `password`, `role`, `email_verified_at`, `phone_verified_at`, `status`, `last_login_at`, `remember_token`, `created_at`, `updated_at`) VALUES
(3, 'Client Example', 'client', 'client@passpilot.ca', NULL, NULL, '$2b$10$kYGC2vcPxHznYRh4A9MaLuHaDcER1yluXZvyFAkel8AJROXWgwk52', 'customer', NULL, NULL, 'active', '2026-06-03 09:36:22', NULL, '2026-06-03 09:56:18', '2026-06-03 15:36:22'),
(5, 'Passpilot Admin', NULL, 'admin@passpilot.ca', '+8801712345678', 'data:image/jpeg;base64,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', '$2b$10$kYGC2vcPxHznYRh4A9MaLuHaDcER1yluXZvyFAkel8AJROXWgwk52', 'admin', NULL, NULL, 'active', '2026-06-03 11:05:13', NULL, '2026-06-03 10:37:21', '2026-06-03 17:05:13'),
(6, 'Primary User', NULL, 'user@passpilot.ca', NULL, NULL, '$2b$10$kYGC2vcPxHznYRh4A9MaLuHaDcER1yluXZvyFAkel8AJROXWgwk52', 'user', NULL, NULL, 'active', '2026-06-03 09:20:26', NULL, '2026-06-03 10:37:21', '2026-06-03 15:20:26'),
(9, 'Test User', NULL, 'testiter@passpilot.ca', NULL, NULL, '$2b$12$WUCFx4eDbpyLbx2UbYSP7.PsD./jSA.I27qT/PtiyVkqfnS1Sq8f2', 'user', NULL, NULL, 'active', NULL, NULL, '2026-06-03 16:21:41', '2026-06-03 16:21:41'),
(11, 'abm', 'abm', 'abm@gmail.com', '01917344267', 'data:image/jpeg;base64,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', '$2b$12$.XixUuv8hDeLHfWVWb3ineNYSqqz0V.q0YSkL6BkLy8.bFsn5zfEK', 'user', NULL, NULL, 'active', '2026-06-04 07:11:40', NULL, '2026-06-03 16:31:29', '2026-06-04 13:11:40'),
(13, 'test', 'test', 'test@gmail.com', '+1 856 235 4563', 'data:image/jpeg;base64,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', '$2b$12$VMY0SaL07m.Mm4tAYYxcu.3luAwIR0gUFm7sF3EuYfqGhZ15.9ykO', 'user', NULL, NULL, 'active', '2026-06-04 11:35:08', NULL, '2026-06-03 16:47:02', '2026-06-04 17:35:08'),
(16, 'Abdur Rahman', 'client2', 'client2@gmail.com', NULL, NULL, '$2b$12$p8B2Sv2BJfZ352N0vOYP5uDSicfQAD7.BdE5cFcSgxQTBdbA969Q.', 'user', NULL, NULL, 'active', '2026-06-04 15:46:09', NULL, '2026-06-04 21:45:58', '2026-06-04 21:46:09');

-- --------------------------------------------------------

--
-- Table structure for table `user_progress`
--

CREATE TABLE `user_progress` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `chapter_id` int(11) NOT NULL,
  `completed_questions` int(11) NOT NULL DEFAULT 0,
  `total_questions` int(11) NOT NULL DEFAULT 0,
  `percentage` decimal(5,2) NOT NULL DEFAULT 0.00,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `user_progress`
--

INSERT INTO `user_progress` (`id`, `user_id`, `chapter_id`, `completed_questions`, `total_questions`, `percentage`, `created_at`, `updated_at`) VALUES
(8, 13, 1, 5, 5, 100.00, '2026-06-04 11:24:56', '2026-06-04 11:24:56'),
(10, 13, 2, 13, 13, 100.00, '2026-06-04 11:33:34', '2026-06-04 11:33:34'),
(11, 13, 8, 8, 8, 100.00, '2026-06-04 11:39:45', '2026-06-04 11:39:45'),
(12, 13, 9, 15, 15, 100.00, '2026-06-04 11:51:17', '2026-06-04 11:51:17'),
(13, 11, 13, 0, 0, 100.00, '2026-06-04 13:11:47', '2026-06-04 13:11:47'),
(15, 5, 13, 1, 1, 100.00, '2026-06-04 13:37:56', '2026-06-04 13:37:56'),
(16, 16, 4, 25, 25, 100.00, '2026-06-04 21:47:26', '2026-06-04 21:47:26');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `activity_logs`
--
ALTER TABLE `activity_logs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `app_settings`
--
ALTER TABLE `app_settings`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `banners`
--
ALTER TABLE `banners`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `blogs`
--
ALTER TABLE `blogs`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `slug` (`slug`),
  ADD KEY `author_id` (`author_id`);

--
-- Indexes for table `blog_categories`
--
ALTER TABLE `blog_categories`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `slug` (`slug`);

--
-- Indexes for table `blog_category_relations`
--
ALTER TABLE `blog_category_relations`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `unique_blog_category` (`blog_id`,`blog_category_id`),
  ADD KEY `blog_category_id` (`blog_category_id`);

--
-- Indexes for table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `slug` (`slug`);

--
-- Indexes for table `chapters`
--
ALTER TABLE `chapters`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `slug` (`slug`),
  ADD KEY `category_id` (`category_id`);

--
-- Indexes for table `contact_messages`
--
ALTER TABLE `contact_messages`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `faqs`
--
ALTER TABLE `faqs`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `languages`
--
ALTER TABLE `languages`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `code` (`code`);

--
-- Indexes for table `mock_tests`
--
ALTER TABLE `mock_tests`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `mock_test_questions`
--
ALTER TABLE `mock_test_questions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `mock_test_id` (`mock_test_id`),
  ADD KEY `question_id` (`question_id`);

--
-- Indexes for table `notifications`
--
ALTER TABLE `notifications`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `payments`
--
ALTER TABLE `payments`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `subscription_id` (`subscription_id`);

--
-- Indexes for table `practice_questions`
--
ALTER TABLE `practice_questions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `chapter_id` (`chapter_id`),
  ADD KEY `source_question_id` (`source_question_id`);

--
-- Indexes for table `practice_question_options`
--
ALTER TABLE `practice_question_options`
  ADD PRIMARY KEY (`id`),
  ADD KEY `question_id` (`question_id`);

--
-- Indexes for table `practice_sessions`
--
ALTER TABLE `practice_sessions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `chapter_id` (`chapter_id`);

--
-- Indexes for table `pricing_features`
--
ALTER TABLE `pricing_features`
  ADD PRIMARY KEY (`id`),
  ADD KEY `pricing_plan_id` (`pricing_plan_id`);

--
-- Indexes for table `pricing_plans`
--
ALTER TABLE `pricing_plans`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `provinces`
--
ALTER TABLE `provinces`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `code` (`code`);

--
-- Indexes for table `questions`
--
ALTER TABLE `questions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `chapter_id` (`chapter_id`);

--
-- Indexes for table `question_options`
--
ALTER TABLE `question_options`
  ADD PRIMARY KEY (`id`),
  ADD KEY `question_id` (`question_id`);

--
-- Indexes for table `settings`
--
ALTER TABLE `settings`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `language_id` (`language_id`),
  ADD KEY `province_id` (`province_id`);

--
-- Indexes for table `site_contacts`
--
ALTER TABLE `site_contacts`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `subscriptions`
--
ALTER TABLE `subscriptions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `pricing_plan_id` (`pricing_plan_id`);

--
-- Indexes for table `testimonials`
--
ALTER TABLE `testimonials`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `test_attempts`
--
ALTER TABLE `test_attempts`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `mock_test_id` (`mock_test_id`);

--
-- Indexes for table `test_attempt_answers`
--
ALTER TABLE `test_attempt_answers`
  ADD PRIMARY KEY (`id`),
  ADD KEY `attempt_id` (`attempt_id`),
  ADD KEY `question_id` (`question_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`),
  ADD UNIQUE KEY `user_name` (`user_name`);

--
-- Indexes for table `user_progress`
--
ALTER TABLE `user_progress`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `unique_user_chapter` (`user_id`,`chapter_id`),
  ADD KEY `chapter_id` (`chapter_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `activity_logs`
--
ALTER TABLE `activity_logs`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `app_settings`
--
ALTER TABLE `app_settings`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `banners`
--
ALTER TABLE `banners`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `blogs`
--
ALTER TABLE `blogs`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `blog_categories`
--
ALTER TABLE `blog_categories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `blog_category_relations`
--
ALTER TABLE `blog_category_relations`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `categories`
--
ALTER TABLE `categories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `chapters`
--
ALTER TABLE `chapters`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `contact_messages`
--
ALTER TABLE `contact_messages`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `faqs`
--
ALTER TABLE `faqs`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `languages`
--
ALTER TABLE `languages`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `mock_tests`
--
ALTER TABLE `mock_tests`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `mock_test_questions`
--
ALTER TABLE `mock_test_questions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=153;

--
-- AUTO_INCREMENT for table `notifications`
--
ALTER TABLE `notifications`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `payments`
--
ALTER TABLE `payments`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `practice_questions`
--
ALTER TABLE `practice_questions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=149;

--
-- AUTO_INCREMENT for table `practice_question_options`
--
ALTER TABLE `practice_question_options`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=593;

--
-- AUTO_INCREMENT for table `practice_sessions`
--
ALTER TABLE `practice_sessions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `pricing_features`
--
ALTER TABLE `pricing_features`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `pricing_plans`
--
ALTER TABLE `pricing_plans`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `provinces`
--
ALTER TABLE `provinces`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `questions`
--
ALTER TABLE `questions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=147;

--
-- AUTO_INCREMENT for table `question_options`
--
ALTER TABLE `question_options`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=589;

--
-- AUTO_INCREMENT for table `settings`
--
ALTER TABLE `settings`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `site_contacts`
--
ALTER TABLE `site_contacts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `subscriptions`
--
ALTER TABLE `subscriptions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `testimonials`
--
ALTER TABLE `testimonials`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `test_attempts`
--
ALTER TABLE `test_attempts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `test_attempt_answers`
--
ALTER TABLE `test_attempt_answers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=61;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `user_progress`
--
ALTER TABLE `user_progress`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `activity_logs`
--
ALTER TABLE `activity_logs`
  ADD CONSTRAINT `activity_logs_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE SET NULL;

--
-- Constraints for table `blogs`
--
ALTER TABLE `blogs`
  ADD CONSTRAINT `blogs_ibfk_1` FOREIGN KEY (`author_id`) REFERENCES `users` (`id`) ON DELETE SET NULL;

--
-- Constraints for table `blog_category_relations`
--
ALTER TABLE `blog_category_relations`
  ADD CONSTRAINT `blog_category_relations_ibfk_1` FOREIGN KEY (`blog_id`) REFERENCES `blogs` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `blog_category_relations_ibfk_2` FOREIGN KEY (`blog_category_id`) REFERENCES `blog_categories` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `chapters`
--
ALTER TABLE `chapters`
  ADD CONSTRAINT `chapters_ibfk_1` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `mock_test_questions`
--
ALTER TABLE `mock_test_questions`
  ADD CONSTRAINT `mock_test_questions_ibfk_1` FOREIGN KEY (`mock_test_id`) REFERENCES `mock_tests` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `mock_test_questions_ibfk_2` FOREIGN KEY (`question_id`) REFERENCES `questions` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `notifications`
--
ALTER TABLE `notifications`
  ADD CONSTRAINT `notifications_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `payments`
--
ALTER TABLE `payments`
  ADD CONSTRAINT `payments_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `payments_ibfk_2` FOREIGN KEY (`subscription_id`) REFERENCES `subscriptions` (`id`) ON DELETE SET NULL;

--
-- Constraints for table `practice_questions`
--
ALTER TABLE `practice_questions`
  ADD CONSTRAINT `practice_questions_ibfk_1` FOREIGN KEY (`chapter_id`) REFERENCES `chapters` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `practice_questions_ibfk_2` FOREIGN KEY (`source_question_id`) REFERENCES `questions` (`id`) ON DELETE SET NULL;

--
-- Constraints for table `practice_question_options`
--
ALTER TABLE `practice_question_options`
  ADD CONSTRAINT `practice_question_options_ibfk_1` FOREIGN KEY (`question_id`) REFERENCES `practice_questions` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `practice_sessions`
--
ALTER TABLE `practice_sessions`
  ADD CONSTRAINT `practice_sessions_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `practice_sessions_ibfk_2` FOREIGN KEY (`chapter_id`) REFERENCES `chapters` (`id`) ON DELETE SET NULL;

--
-- Constraints for table `pricing_features`
--
ALTER TABLE `pricing_features`
  ADD CONSTRAINT `pricing_features_ibfk_1` FOREIGN KEY (`pricing_plan_id`) REFERENCES `pricing_plans` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `questions`
--
ALTER TABLE `questions`
  ADD CONSTRAINT `questions_ibfk_1` FOREIGN KEY (`chapter_id`) REFERENCES `chapters` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `question_options`
--
ALTER TABLE `question_options`
  ADD CONSTRAINT `question_options_ibfk_1` FOREIGN KEY (`question_id`) REFERENCES `questions` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `settings`
--
ALTER TABLE `settings`
  ADD CONSTRAINT `settings_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `settings_ibfk_2` FOREIGN KEY (`language_id`) REFERENCES `languages` (`id`) ON DELETE SET NULL,
  ADD CONSTRAINT `settings_ibfk_3` FOREIGN KEY (`province_id`) REFERENCES `provinces` (`id`) ON DELETE SET NULL;

--
-- Constraints for table `subscriptions`
--
ALTER TABLE `subscriptions`
  ADD CONSTRAINT `subscriptions_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `subscriptions_ibfk_2` FOREIGN KEY (`pricing_plan_id`) REFERENCES `pricing_plans` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `test_attempts`
--
ALTER TABLE `test_attempts`
  ADD CONSTRAINT `test_attempts_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `test_attempts_ibfk_2` FOREIGN KEY (`mock_test_id`) REFERENCES `mock_tests` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `test_attempt_answers`
--
ALTER TABLE `test_attempt_answers`
  ADD CONSTRAINT `test_attempt_answers_ibfk_1` FOREIGN KEY (`attempt_id`) REFERENCES `test_attempts` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `test_attempt_answers_ibfk_2` FOREIGN KEY (`question_id`) REFERENCES `questions` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `user_progress`
--
ALTER TABLE `user_progress`
  ADD CONSTRAINT `user_progress_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `user_progress_ibfk_2` FOREIGN KEY (`chapter_id`) REFERENCES `chapters` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
