-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 13, 2023 at 02:40 AM
-- Server version: 10.4.24-MariaDB
-- PHP Version: 7.4.29

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `db_wd66p`
--

-- --------------------------------------------------------

--
-- Table structure for table `tbl_course`
--

CREATE TABLE `tbl_course` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `code` varchar(10) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `tbl_course`
--

INSERT INTO `tbl_course` (`id`, `name`, `code`) VALUES
(1, 'TEST', 'T');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_users`
--

CREATE TABLE `tbl_users` (
  `id` int(11) NOT NULL,
  `fname` varchar(100) NOT NULL,
  `lname` varchar(100) NOT NULL,
  `course_id` int(11) NOT NULL,
  `username` varchar(50) NOT NULL,
  `password` text NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `is_active` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `tbl_users`
--

INSERT INTO `tbl_users` (`id`, `fname`, `lname`, `course_id`, `username`, `password`, `created_at`, `is_active`) VALUES
(1, 'TEST', 'TEST', 1, 'test', 'test', '2023-07-11 12:15:45', 0),
(2, 'sample', 'sample', 1, 'sample', 'sample', '0000-00-00 00:00:00', 0),
(3, 'test2', 'test2', 1, 'test2', 'test2', '2023-07-12 12:08:33', 0),
(4, 'muwubaxety@mailinator.com', 'xesevata@mailinator.com', 1, 'xevo@mailinator.com', 'Pa$$w0rd!', '2023-07-12 12:37:02', 1),
(5, 'bajanej@mailinator.com', 'wulimivimo@mailinator.com', 1, 'vutewi@mailinator.com', 'Pa$$w0rd!', '2023-07-12 12:37:13', 1),
(6, 'tona@mailinator.com', 'casarogub@mailinator.com', 1, 'fenomyqunu@mailinator.com', 'Pa$$w0rd!', '2023-07-12 12:37:23', 1),
(7, 'mynah@mailinator.com', 'xamude@mailinator.com', 1, 'cemuny@mailinator.com', 'Pa$$w0rd!', '2023-07-12 12:47:29', 1),
(8, 'wyjyto@mailinator.com', 'capomywi@mailinator.com', 1, 'lorawe@mailinator.com', 'Pa$$w0rd!', '2023-07-12 12:47:39', 1),
(9, 'qonazojud@mailinator.com', 'jecob@mailinator.com', 1, 'sary@mailinator.com', '$2y$10$hR.aU589NsZqxYlXShTokuSlaFhkWDG1t6BbqchWSnHlz0Gd88mHm', '2023-07-12 12:48:39', 1),
(10, 'zudi@mailinator.com', 'covuqucod@mailinator.com', 1, 'tulaq@mailinator.com', '$2y$10$mELXpGT..iYgctZUzaWazezlVj14J2h1cM0REXbyJfJweGeen25tO', '2023-07-12 12:48:53', 1),
(11, 'cavazer@mailinator.com', 'gafezi@mailinator.com', 1, 'vucukuc@mailinator.com', '$2y$10$gQCeVyh3D1eIQStwmD.TLeYgqyatEV5K16121kbobAAiUhS/rNOGO', '2023-07-12 12:50:07', 1),
(12, 'Omar Beck', 'Noble Dalton', 1, 'cufonuc@mailinator.com', '$2y$10$cxhYvC26OwvxWIVvmpqG7uslZzgg8USwHZT.VD/Fmq8c6XC9IjK42', '2023-07-12 12:50:24', 1),
(13, 'Ashely Whitfield', 'Jason Coleman', 1, 'raqed@mailinator.com', '$2y$10$2RwuGIHJ2y0.4sLqmYhpz.QY9thTUmZMPl7EP.5tH4bgi9D3K58ha', '2023-07-12 12:50:28', 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `tbl_course`
--
ALTER TABLE `tbl_course`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tbl_users`
--
ALTER TABLE `tbl_users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `idx_username` (`username`),
  ADD KEY `tbl_users_to_tbl_course_2` (`course_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `tbl_course`
--
ALTER TABLE `tbl_course`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `tbl_users`
--
ALTER TABLE `tbl_users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `tbl_users`
--
ALTER TABLE `tbl_users`
  ADD CONSTRAINT `tbl_users_to_tbl_course` FOREIGN KEY (`course_id`) REFERENCES `tbl_course` (`id`),
  ADD CONSTRAINT `tbl_users_to_tbl_course_2` FOREIGN KEY (`course_id`) REFERENCES `tbl_course` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
