-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 22, 2025 at 08:46 AM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `recyclocarts`
--

-- --------------------------------------------------------

--
-- Table structure for table `log_in`
--

CREATE TABLE `log_in` (
  `Username` varchar(20) NOT NULL,
  `Status` varchar(20) NOT NULL,
  `TimeStamp` timestamp(6) NOT NULL DEFAULT current_timestamp(6) ON UPDATE current_timestamp(6)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `log_in`
--

INSERT INTO `log_in` (`Username`, `Status`, `TimeStamp`) VALUES
('sm', 'success', '2025-03-23 11:07:29.000000'),
('sm', 'success', '2025-03-23 11:27:50.000000'),
('Roshni', 'success', '2025-04-09 09:05:56.000000'),
('p', 'success', '2025-04-14 09:37:58.000000');

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `id` int(11) NOT NULL,
  `items` text NOT NULL,
  `amount` decimal(10,0) NOT NULL,
  `payment_method` varchar(50) NOT NULL,
  `status` varchar(20) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`id`, `items`, `amount`, `payment_method`, `status`, `created_at`) VALUES
(9, '[{\"name\":\"Iron Decorative\",\"quantity\":2,\"price\":500,\"total\":1000}]', 1000, 'COD', 'Pending', '2025-04-14 11:47:21'),
(10, '[{\"name\":\"Aluminium Foil Paper\",\"quantity\":1,\"price\":150,\"total\":150}]', 150, 'UPI', 'Pending', '2025-04-15 07:56:41');

-- --------------------------------------------------------

--
-- Table structure for table `pick_up`
--

CREATE TABLE `pick_up` (
  `Username` varchar(20) NOT NULL,
  `Phone` int(10) NOT NULL,
  `Date` date NOT NULL,
  `Time` time(6) NOT NULL,
  `Address` varchar(50) NOT NULL,
  `Weight` int(8) NOT NULL,
  `Confirm_Item` varchar(20) NOT NULL,
  `points` int(9) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `pick_up`
--

INSERT INTO `pick_up` (`Username`, `Phone`, `Date`, `Time`, `Address`, `Weight`, `Confirm_Item`, `points`) VALUES
('sm', 2345678, '2025-04-03', '23:11:00.000000', 'sdcunsnisd', 4, 'Steel', 0),
('sm', 5674389, '2025-04-03', '23:12:00.000000', 'sdcjnsd', 5, 'Steel', 0),
('sm', 32487, '2025-04-10', '14:15:00.000000', 'djsdjl', 7, 'E-Waste', 0),
('sm', 2147483647, '2025-04-28', '14:30:00.000000', 'jnbvfgh', 13, 'Copper', 0),
('sm', 2147483647, '2025-05-01', '14:35:00.000000', 'sodcnsdocndncdnccjnjcnjncjknjsncnjkcnjndjkcndjkcns', 12, 'Copper', 0),
('sm', 4567, '2025-04-05', '14:45:00.000000', 'awkdcjbcd', 5, 'Copper', 0),
('sm', 1234567890, '2025-04-16', '14:49:00.000000', 'sildcusilc', 6, 'E-Waste', 60),
('sm', 2147483647, '2025-04-04', '18:00:00.000000', 'sdcbsdkbjc', 8, 'Brass', 80);

-- --------------------------------------------------------

--
-- Table structure for table `sign_up`
--

CREATE TABLE `sign_up` (
  `First_Name` varchar(30) NOT NULL,
  `Last_Name` varchar(25) NOT NULL,
  `Email_id` varchar(40) NOT NULL,
  `Username` varchar(20) NOT NULL,
  `Password` varchar(255) NOT NULL,
  `Confirm_Password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `sign_up`
--

INSERT INTO `sign_up` (`First_Name`, `Last_Name`, `Email_id`, `Username`, `Password`, `Confirm_Password`) VALUES
('p', 'q', 'r@gmail.com', 'p', '$2y$10$06LKIuIUzNc8jYNLqCEbjOds7RoCMFViqsru3WFHcVSAsmltDIZWe', ''),
('Roshni', 'Mandli', 'roshni.mandli@gmail.com', 'roshni', '$2y$10$mh0GoGYlji8ZkT1ooWIfJu9v.p04AIPd46JmghDEIKZeBDygwXPpi', ''),
('shlok', 'Mistry', 'shlokmistry1997@gmail.com', 'sm', '$2y$10$ZuLjmFHQQxwwAN/.74f5be4Xs4EIU1h8cwNkXs2bOoZBMJniOP7JC', '');

-- --------------------------------------------------------

--
-- Table structure for table `total_products`
--

CREATE TABLE `total_products` (
  `steel_bottle` int(8) NOT NULL,
  `copper_water_dispenser` int(8) NOT NULL,
  `iron_decorative` int(8) NOT NULL,
  `aluminium_foil_paper` int(8) NOT NULL,
  `brass_buddha` int(8) NOT NULL,
  `e-waste_lamps` int(8) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `total_products`
--

INSERT INTO `total_products` (`steel_bottle`, `copper_water_dispenser`, `iron_decorative`, `aluminium_foil_paper`, `brass_buddha`, `e-waste_lamps`) VALUES
(20000, 20000, 19998, 19999, 20000, 20000);

-- --------------------------------------------------------

--
-- Table structure for table `total_waste_collected`
--

CREATE TABLE `total_waste_collected` (
  `Steel` int(10) NOT NULL,
  `Copper` int(10) NOT NULL,
  `Cast Iron` int(10) NOT NULL,
  `Aluminium` int(10) NOT NULL,
  `Brass` int(10) NOT NULL,
  `E-Waste` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `total_waste_collected`
--

INSERT INTO `total_waste_collected` (`Steel`, `Copper`, `Cast Iron`, `Aluminium`, `Brass`, `E-Waste`) VALUES
(5, 35, 5, 5, 13, 18);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `sign_up`
--
ALTER TABLE `sign_up`
  ADD PRIMARY KEY (`Username`),
  ADD UNIQUE KEY `Email_id` (`Email_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
