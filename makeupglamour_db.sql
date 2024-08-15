-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Aug 15, 2024 at 09:57 AM
-- Server version: 10.11.8-MariaDB-cll-lve
-- PHP Version: 7.2.34

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `makeupglamour_db`
--
CREATE DATABASE IF NOT EXISTS `makeupglamour_db` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE `makeupglamour_db`;

-- --------------------------------------------------------

--
-- Table structure for table `appointments`
--

DROP TABLE IF EXISTS `appointments`;
CREATE TABLE `appointments` (
  `id` int(11) NOT NULL,
  `userid` int(11) NOT NULL,
  `serviceid` int(11) NOT NULL,
  `address` varchar(255) NOT NULL,
  `message` varchar(255) DEFAULT NULL,
  `date` datetime NOT NULL DEFAULT current_timestamp(),
  `status` enum('Pending','Accepted','Cancelled','Rejected') NOT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `appointments`
--

INSERT INTO `appointments` (`id`, `userid`, `serviceid`, `address`, `message`, `date`, `status`, `created_at`) VALUES
(20, 3, 1, 'asdf', 'asdf', '2024-06-10 22:00:00', 'Accepted', '2024-06-12 14:34:15'),
(22, 3, 2, 'asdf', 'asdf', '2024-06-10 22:01:00', 'Pending', '2024-06-12 14:34:15'),
(24, 3, 4, '236 South Rocky New Court', '57 Milton Lane', '2024-06-13 17:57:00', 'Accepted', '2024-06-12 14:35:14'),
(25, 19, 1, 'Magsaysay ', 'hi pa make ko ', '2024-06-12 13:00:00', 'Accepted', '2024-06-12 16:42:50'),
(26, 20, 2, 'Bualan', 'hello dave good pm make up ko ', '2024-06-12 10:30:00', 'Rejected', '2024-06-12 17:16:16'),
(27, 20, 2, 'Bualan', '', '2024-06-13 08:00:00', 'Accepted', '2024-06-12 18:00:59'),
(28, 22, 4, 'Magsaysay, Lanao del Norte', 'pa makeup ko deb', '2024-06-15 07:30:00', 'Cancelled', '2024-06-12 19:34:19'),
(29, 22, 4, 'Magsaysay, Lanao del Norte', '', '2024-06-15 07:30:00', 'Pending', '2024-06-12 19:38:05'),
(30, 22, 1, 'Magsaysay, Lanao del Norte', '', '2024-06-15 07:30:00', 'Pending', '2024-06-12 19:39:56'),
(31, 23, 1, 'Pob 4 clarin', '', '2024-06-13 19:42:00', 'Accepted', '2024-06-12 19:42:16'),
(32, 23, 1, 'Pob 4 clarin', '', '2024-06-13 19:42:00', 'Pending', '2024-06-12 19:42:18'),
(33, 23, 4, 'Pob 4', '', '2024-06-26 19:41:00', 'Pending', '2024-06-12 19:42:46'),
(34, 23, 4, 'Pob 4', '', '2024-06-26 19:41:00', 'Pending', '2024-06-12 19:42:48'),
(35, 23, 4, 'Pob 4', '', '2024-06-26 19:41:00', 'Pending', '2024-06-12 19:42:56'),
(36, 26, 2, 'P-3 Tabid Ozamiz City', 'Nsbchdhwhs', '2024-06-12 20:26:00', 'Accepted', '2024-06-12 20:27:00'),
(37, 27, 2, 'Purok 2', 'I WANT VERY NICE', '2024-06-13 09:17:00', 'Rejected', '2024-06-13 09:18:08'),
(38, 28, 4, 'Liposong', 'kjdsakdahhda', '2024-06-13 22:19:00', 'Accepted', '2024-06-13 09:19:15'),
(39, 30, 1, 'Poblacion Tubod, Lanao del Norte', '', '2024-06-20 12:50:00', 'Pending', '2024-06-13 12:53:27'),
(40, 31, 16, 'Aguada, Ozamis City', '', '2024-07-13 08:30:00', 'Accepted', '2024-06-13 14:56:32'),
(41, 31, 4, 'Aguada, Ozamis City', 'hi bading', '2024-06-13 15:27:00', 'Pending', '2024-06-13 15:27:56'),
(42, 27, 2, 'Purok 2', '', '2024-06-19 08:20:00', 'Pending', '2024-06-13 16:23:27'),
(43, 31, 2, 'Aguada, Ozamis City', '', '2024-06-14 16:37:00', 'Accepted', '2024-06-13 16:25:16'),
(44, 31, 1, 'Aguada, Ozamis City', '', '2024-06-14 04:37:00', 'Pending', '2024-06-13 16:26:50'),
(45, 31, 1, 'Aguada, Ozamis City', '', '2024-06-14 04:37:00', 'Pending', '2024-06-13 16:31:51'),
(50, 31, 1, 'Aguada, Ozamis City', 'jsjsjs', '2024-06-13 19:26:00', 'Pending', '2024-06-13 19:27:04'),
(51, 31, 1, 'Aguada, Ozamis City', 'nsjjss', '2024-06-13 19:28:00', 'Pending', '2024-06-13 19:29:03'),
(52, 31, 2, 'nxjjs', 'jxjjsx', '2024-06-13 19:29:00', 'Pending', '2024-06-13 19:29:11'),
(53, 31, 1, 'Aguada, Ozamis City', 'bbk', '2024-06-13 19:40:00', 'Pending', '2024-06-13 19:40:47'),
(54, 31, 1, 'Aguada, Ozamis City', '', '2024-06-13 19:44:00', 'Pending', '2024-06-13 19:44:07'),
(55, 31, 2, 'jjsjjs', '', '2024-06-13 19:44:00', 'Pending', '2024-06-13 19:44:16'),
(56, 31, 3, 'jdjjd', '', '2024-06-13 19:44:00', 'Pending', '2024-06-13 19:44:26'),
(57, 3, 16, 'Ozamiz', 'jdjs', '2024-06-13 19:56:00', 'Pending', '2024-06-13 19:56:10'),
(58, 36, 4, 'Pantaon, Ozamis City', 'Hi madi ', '2024-06-14 06:29:00', 'Cancelled', '2024-06-14 06:29:54'),
(59, 29, 1, 'Bagakay, Ozamis City', '', '2024-06-17 06:39:00', 'Cancelled', '2024-06-14 06:39:54'),
(60, 29, 4, 'Bagakay, Ozamis City', '', '2024-06-14 06:40:00', 'Rejected', '2024-06-14 06:40:37'),
(61, 29, 16, 'Bagakay, Ozamis City', '', '2024-06-18 06:41:00', 'Accepted', '2024-06-14 06:41:19'),
(62, 36, 1, 'Pantaon, Ozamis City', '', '2024-06-14 06:41:00', 'Pending', '2024-06-14 06:41:57'),
(63, 36, 4, 'Bagakay, Ozamis City', '', '2024-06-16 06:42:00', 'Pending', '2024-06-14 06:42:20'),
(64, 36, 14, 'Pantaon', '', '2024-06-14 06:42:00', 'Pending', '2024-06-14 06:42:35'),
(65, 29, 16, 'Bagakay, Ozamis City', '', '2024-06-14 08:34:00', 'Pending', '2024-06-14 08:34:05'),
(66, 29, 4, 'Bagakay, Ozamis City', '', '2024-06-22 08:34:00', 'Accepted', '2024-06-14 08:34:37'),
(67, 29, 1, 'Bagakay, Ozamis City', '', '2024-06-28 02:11:00', 'Pending', '2024-06-14 09:11:56'),
(68, 37, 1, 'Bagakay, Ozamiz City', '', '2024-06-14 09:15:00', 'Pending', '2024-06-14 09:15:29'),
(69, 37, 2, 'Bagakay, Ozamiz City', '', '2024-06-14 09:15:00', 'Pending', '2024-06-14 09:15:50'),
(70, 43, 1, 'Dhhdhd', '', '2024-06-14 12:25:00', 'Accepted', '2024-06-14 12:25:41'),
(71, 43, 2, 'Pigcarangan Tubod, Lanao del Norte', '', '2024-06-15 00:16:00', 'Accepted', '2024-06-15 00:16:58');

-- --------------------------------------------------------

--
-- Table structure for table `services`
--

DROP TABLE IF EXISTS `services`;
CREATE TABLE `services` (
  `id` int(11) NOT NULL,
  `service` varchar(255) NOT NULL,
  `description` varchar(255) NOT NULL,
  `price` double(10,2) NOT NULL,
  `image` varchar(255) DEFAULT NULL,
  `status` varchar(100) NOT NULL DEFAULT 'Available'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `services`
--

INSERT INTO `services` (`id`, `service`, `description`, `price`, `image`, `status`) VALUES
(1, 'Bridal Makeup', 'Bridal makeup is a specialized service dedicated to ensuring that brides look their absolute best on their wedding day.', 2300.00, '17181840081.jpg', 'Available'),
(2, 'Fresh Makeup', 'Fresh makeup is a type of makeup that is designed to create a natural effortless look that enhances the wearers natural beauty.', 2000.00, '17181783150f9ce5b6-f5bb-483d-aa33-24f37304c302.jpg', 'Available'),
(3, 'Pageant Makeup', 'Pageant makeup is a type of makeup that is designed to create a flawless, radiant look that enhances the features. Pageant makeup creates a stunning, radiant transformation.', 5000.00, '171818482361.jpg', 'Unavailable'),
(4, 'Euphoria Makeup', 'Makeup Euphoria is a style of makeup that is inspired by the bold and vibrant looks. Makeup Euphoria is a style of makeup.', 2000.00, '17181848505.jpg', 'Available'),
(14, 'Package Makeup for Wedding ', 'A wedding makeup package for the bride, bridesmaids, flower girls, and mother of the bride typically involves creating a cohesive look .', 15000.00, '17181849717.jpg', 'Available'),
(15, 'Package Makeup for Debut', 'A debut makeup package is designed to create a stunning and youthful look for a young womans debut celebration.', 8000.00, '17181850708.jpg', 'Available'),
(16, 'Package Makeup for Fun Photoshoot', 'A debut makeup package is designed to create a stunning and youthful look for a young womans debut celebration.', 3000.00, '17181851799.jpg', 'Available'),
(19, 'Make ni sya', 'ffggfhghg', 1234.00, '1718268451haircut.jfif', 'Unavailable');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `firstname` varchar(255) NOT NULL,
  `lastname` varchar(255) NOT NULL,
  `gender` enum('Male','Female','Other','') NOT NULL,
  `phonenumber` varchar(255) NOT NULL,
  `address` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `image` varchar(255) DEFAULT 'default.jpg',
  `usertype` enum('Client','Incharge','Admin') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `firstname`, `lastname`, `gender`, `phonenumber`, `address`, `email`, `password`, `image`, `usertype`) VALUES
(1, 'Dave Flores', 'Epe', 'Female', '217', '953 Milton Street', 'admin@gmail.com', 'admin', '1718183219436449984_438265055352090_4432407009070925153_n.jpg', 'Admin'),
(2, 'Dave Flores', 'Young', 'Female', '09853453888', 'Carmen Annex, Ozamiz', 'incharge@gmail.com', 'incharge', '1718182560IMG_8055.jpeg', 'Incharge'),
(3, 'Dave', 'Cruz', 'Female', '09843254312', 'Ozamiz', 'client@gmail.com', 'client', '1718279593IMG_0185.jpeg', 'Client'),
(18, 'Dave Angelo', 'Cambonga', 'Male', '09150459917', 'P-3 Tabid Ozamiz City', 'skadi06212004@gmail.com', 'skadicc12345', '1718247235IMG_0183.jpeg', 'Client'),
(19, 'Aj', 'Daligdig', 'Male', '091254323', 'Magsaysay ', 'aj@gmail.com', 'ajaj', '1718181918IMG_0185.jpeg', 'Client'),
(20, 'Justine', 'Denila', 'Female', '09236578965', 'Bualan', 'justinedenila19@gmail.com', 'justine', '17181863375.jpg', 'Client'),
(21, 'Crystal Jane', 'Lagunsad', 'Female', '09762619575', 'Carmen Annex', 'crytal@gmail.com', '123', '17181866529.jpg', 'Client'),
(22, 'TC Margarette', 'Pantillo', 'Female', '09234213456', 'Magsaysay, Lanao del Norte', 'tc@gmail.com', 'tctc', '1718192157IMG_8629.jpeg', 'Client'),
(23, 'james', 'mintang', 'Male', '09156339058', 'Pob 4 clarin', 'mintang@gmail.com', '1234', 'default.jpg', 'Client'),
(25, 'Justine ', 'Denila', 'Female', '09675678907', 'Bualan Tubod, Lanao del Norte', 'justineincharge@gmail.com', 'justineincharge', '1718195159IMG_9423.jpeg', 'Incharge'),
(26, 'Dave Angelo', 'Cambonga', 'Male', '09150459917', 'P-3 Tabid Ozamiz City', 'skadi06212004@gmail.com', 'skadicc12345', '1718247235IMG_0183.jpeg', 'Client'),
(27, 'Jevie', 'Saturre', 'Female', '09053964708', 'Purok 2', 'saturre.jevie@gmail.com', '123', '1718241597alastor.jpg', 'Client'),
(28, 'July', 'Abadilla', 'Female', '09185840945', 'Liposong', 'je@gmail.com', '123', '17182415695.jpg', 'Client'),
(29, 'Hidear', 'Talirongan', 'Male', '09192824288', 'Bagakay, Ozamis City', 'hidear@gmail.com', '1234', '17183183731000040143.jpg', 'Client'),
(30, 'Siti Sheena', 'Mediana', 'Female', '09523687458', 'Poblacion Tubod, Lanao del Norte', 'siti@gmail.com', 'siti', '17182543751000014862.jpg', 'Client'),
(31, 'Prince Florin', 'Sumagang', 'Male', '09564323452', 'Aguada, Ozamis City', 'prince@gmail.com', 'princee', '1718263697logo.png', 'Client'),
(36, 'Jefferson', 'Canamo', 'Male', '09562352153', 'Pantaon, Ozamis City', 'jeff@gmail.com', 'jeff', '17183178371000039968.jpg', 'Client'),
(37, 'Florence', 'Talirongan', 'Female', '095626262', 'Bagakay, Ozamiz City', 'florence@gmail.com', 'flo', '17183277901000016178.jpg', 'Client'),
(38, 'Dave', 'Epe', 'Male', '09727272626', 'jdjsjs', 'test@gmail.com', 'test', 'default.jpg', 'Client'),
(40, 'Jessa', 'Abadilla', 'Female', '095656652', 'Jdjdjd', 'jess@gmail.com', 'jess', 'default.jpg', 'Client'),
(41, 'Idkjdd', 'Jdjjdd', 'Male', '0956565', 'Hdhdhd', 'd@gmail.com', 'dd', 'default.jpg', 'Client'),
(42, 'Khecy', 'Palioto', 'Female', '09773706025', 'Tabid', 'khecy@gmail.com', '1234', 'default.jpg', 'Client'),
(43, 'Siti', 'Mediana', 'Female', '09566565777', 'Pigcarangan Tubod, Lanao del Norte', 'sitisheena@gmail.com', 'siti', '1718381785396D27A0-0C82-4A25-8503-24979EFA2304.png', 'Client'),
(44, 'Francille', 'Mapagdalita ', 'Female', '09656433461', 'Calabayan', 'frnx@gmail.com', 'frnx123', 'default.jpg', 'Client');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `appointments`
--
ALTER TABLE `appointments`
  ADD PRIMARY KEY (`id`),
  ADD KEY `userid` (`userid`),
  ADD KEY `serviceid` (`serviceid`);

--
-- Indexes for table `services`
--
ALTER TABLE `services`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `appointments`
--
ALTER TABLE `appointments`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=72;

--
-- AUTO_INCREMENT for table `services`
--
ALTER TABLE `services`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=45;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `appointments`
--
ALTER TABLE `appointments`
  ADD CONSTRAINT `appointments_ibfk_1` FOREIGN KEY (`userid`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `appointments_ibfk_2` FOREIGN KEY (`serviceid`) REFERENCES `services` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
