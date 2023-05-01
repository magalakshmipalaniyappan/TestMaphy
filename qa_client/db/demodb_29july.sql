-- phpMyAdmin SQL Dump
-- version 5.0.3
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Jul 29, 2021 at 05:48 PM
-- Server version: 10.4.14-MariaDB
-- PHP Version: 7.2.34

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `magpieticket`
--

-- --------------------------------------------------------

--
-- Table structure for table `accessories`
--

CREATE TABLE `accessories` (
  `id` int(10) UNSIGNED NOT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `category_id` int(11) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  `qty` int(11) NOT NULL DEFAULT 0,
  `requestable` tinyint(1) NOT NULL DEFAULT 0,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `location_id` int(11) DEFAULT NULL,
  `purchase_date` date DEFAULT NULL,
  `purchase_cost` decimal(20,2) DEFAULT NULL,
  `order_number` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `company_id` int(10) UNSIGNED DEFAULT NULL,
  `min_amt` int(11) DEFAULT NULL,
  `manufacturer_id` int(11) DEFAULT NULL,
  `model_number` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `image` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `supplier_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `accessories`
--

INSERT INTO `accessories` (`id`, `name`, `category_id`, `user_id`, `qty`, `requestable`, `created_at`, `updated_at`, `deleted_at`, `location_id`, `purchase_date`, `purchase_cost`, `order_number`, `company_id`, `min_amt`, `manufacturer_id`, `model_number`, `image`, `supplier_id`) VALUES
(1, 'Sculpt Comfort Mouse', 18, 55, 7, 0, '2021-07-10 10:40:47', '2021-07-10 10:47:25', NULL, 17, '2021-07-10', '124.01', '356788g675fthgf', 4, 1, 13, '56485VHF654', NULL, 5);

-- --------------------------------------------------------

--
-- Table structure for table `accessories_users`
--

CREATE TABLE `accessories_users` (
  `id` int(10) UNSIGNED NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `accessory_id` int(11) DEFAULT NULL,
  `assigned_to` int(11) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `note` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `action_logs`
--

CREATE TABLE `action_logs` (
  `id` int(10) UNSIGNED NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `action_type` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `target_id` int(11) DEFAULT NULL,
  `target_type` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `location_id` int(11) DEFAULT NULL,
  `note` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `filename` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `item_type` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `item_id` int(11) NOT NULL,
  `expected_checkin` date DEFAULT NULL,
  `accepted_id` int(11) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `thread_id` int(11) DEFAULT NULL,
  `company_id` int(11) DEFAULT NULL,
  `accept_signature` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `log_meta` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `action_date` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `action_logs`
--

INSERT INTO `action_logs` (`id`, `user_id`, `action_type`, `target_id`, `target_type`, `location_id`, `note`, `filename`, `item_type`, `item_id`, `expected_checkin`, `accepted_id`, `created_at`, `updated_at`, `deleted_at`, `thread_id`, `company_id`, `accept_signature`, `log_meta`, `action_date`) VALUES
(1, 44, 'create new', NULL, NULL, NULL, NULL, NULL, 'App\\Models\\License', 1, NULL, NULL, '2021-06-03 12:35:34', '2021-06-03 12:35:34', NULL, NULL, NULL, NULL, NULL, NULL),
(2, 56, 'update', NULL, NULL, NULL, NULL, NULL, 'App\\Models\\License', 1, NULL, NULL, '2021-07-09 07:48:37', '2021-07-09 07:48:37', NULL, NULL, NULL, NULL, NULL, NULL),
(3, 56, 'checkout', 54, 'App\\Models\\User', NULL, NULL, NULL, 'App\\Models\\License', 1, NULL, NULL, '2021-07-09 07:48:49', '2021-07-09 07:48:49', NULL, NULL, NULL, NULL, NULL, NULL),
(4, 56, 'checkin from', NULL, NULL, NULL, NULL, NULL, 'App\\Models\\License', 1, NULL, NULL, '2021-07-09 07:49:10', '2021-07-09 07:49:10', NULL, NULL, NULL, NULL, NULL, NULL),
(5, 56, 'checkout', 57, 'App\\Models\\User', NULL, NULL, NULL, 'App\\Models\\License', 1, NULL, NULL, '2021-07-09 10:42:09', '2021-07-09 10:42:09', NULL, NULL, NULL, NULL, NULL, NULL),
(6, 55, 'create new', NULL, NULL, NULL, NULL, NULL, 'App\\Models\\Component', 1, NULL, NULL, '2021-07-10 09:40:10', '2021-07-10 09:40:10', NULL, NULL, NULL, NULL, NULL, NULL),
(7, 55, 'update', NULL, NULL, NULL, NULL, NULL, 'App\\Models\\Component', 1, NULL, NULL, '2021-07-10 09:44:33', '2021-07-10 09:44:33', NULL, NULL, NULL, NULL, NULL, NULL),
(8, 55, 'update', NULL, NULL, NULL, NULL, NULL, 'App\\Models\\Consumable', 1, NULL, NULL, '2021-07-10 10:04:57', '2021-07-10 10:04:57', NULL, NULL, NULL, NULL, NULL, NULL),
(9, 55, 'update', NULL, NULL, NULL, NULL, NULL, 'App\\Models\\Consumable', 1, NULL, NULL, '2021-07-10 10:10:35', '2021-07-10 10:10:35', NULL, NULL, NULL, NULL, NULL, NULL),
(10, 55, 'create new', NULL, NULL, NULL, NULL, NULL, 'App\\Models\\Accessory', 1, NULL, NULL, '2021-07-10 10:40:47', '2021-07-10 10:40:47', NULL, NULL, NULL, NULL, NULL, NULL),
(11, 55, 'update', NULL, NULL, NULL, NULL, NULL, 'App\\Models\\Accessory', 1, NULL, NULL, '2021-07-10 10:47:25', '2021-07-10 10:47:25', NULL, NULL, NULL, NULL, NULL, NULL),
(12, 55, 'create new', NULL, NULL, NULL, NULL, NULL, 'App\\Models\\License', 2, NULL, NULL, '2021-07-10 10:58:20', '2021-07-10 10:58:20', NULL, NULL, NULL, NULL, NULL, NULL),
(13, 55, 'create new', NULL, NULL, NULL, NULL, NULL, 'App\\Models\\License', 3, NULL, NULL, '2021-07-10 11:24:40', '2021-07-10 11:24:40', NULL, NULL, NULL, NULL, NULL, NULL),
(14, 55, 'delete', NULL, NULL, NULL, NULL, NULL, 'App\\Models\\License', 3, NULL, NULL, '2021-07-10 11:24:45', '2021-07-10 11:24:45', NULL, NULL, NULL, NULL, NULL, NULL),
(15, 55, 'delete', NULL, NULL, NULL, NULL, NULL, 'App\\Models\\License', 2, NULL, NULL, '2021-07-10 11:24:51', '2021-07-10 11:24:51', NULL, NULL, NULL, NULL, NULL, NULL),
(16, 55, 'create new', NULL, NULL, NULL, NULL, NULL, 'App\\Models\\License', 4, NULL, NULL, '2021-07-10 11:34:01', '2021-07-10 11:34:01', NULL, NULL, NULL, NULL, NULL, NULL),
(17, 55, 'delete', NULL, NULL, NULL, NULL, NULL, 'App\\Models\\License', 4, NULL, NULL, '2021-07-10 11:34:06', '2021-07-10 11:34:06', NULL, NULL, NULL, NULL, NULL, NULL),
(18, 56, 'create new', NULL, NULL, 15, NULL, NULL, 'App\\Models\\Asset', 1, NULL, NULL, '2021-07-16 06:17:57', '2021-07-16 06:17:57', NULL, NULL, 1, NULL, NULL, NULL),
(19, 56, 'checkout', 57, 'App\\Models\\User', NULL, NULL, NULL, 'App\\Models\\Asset', 1, NULL, NULL, '2021-07-17 05:20:01', '2021-07-17 05:20:01', NULL, NULL, NULL, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `assets`
--

CREATE TABLE `assets` (
  `id` int(10) UNSIGNED NOT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `asset_tag` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `model_id` int(11) DEFAULT NULL,
  `serial` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `purchase_date` date DEFAULT NULL,
  `purchase_cost` decimal(20,2) DEFAULT NULL,
  `order_number` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `assigned_to` int(11) DEFAULT NULL,
  `notes` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `image` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `physical` tinyint(1) NOT NULL DEFAULT 1,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `status_id` int(11) DEFAULT NULL,
  `archived` tinyint(1) DEFAULT 0,
  `warranty_months` int(11) DEFAULT NULL,
  `depreciate` tinyint(1) DEFAULT NULL,
  `supplier_id` int(11) DEFAULT NULL,
  `requestable` tinyint(4) NOT NULL DEFAULT 0,
  `rtd_location_id` int(11) DEFAULT NULL,
  `_snipeit_mac_address_1` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `accepted` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `last_checkout` datetime DEFAULT NULL,
  `expected_checkin` date DEFAULT NULL,
  `company_id` int(10) UNSIGNED DEFAULT NULL,
  `assigned_type` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `last_audit_date` datetime DEFAULT NULL,
  `next_audit_date` date DEFAULT NULL,
  `location_id` int(11) DEFAULT NULL,
  `checkin_counter` int(11) NOT NULL DEFAULT 0,
  `checkout_counter` int(11) NOT NULL DEFAULT 0,
  `requests_counter` int(11) NOT NULL DEFAULT 0,
  `latitude` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `longitude` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `audit_status_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `assets`
--

INSERT INTO `assets` (`id`, `name`, `asset_tag`, `model_id`, `serial`, `purchase_date`, `purchase_cost`, `order_number`, `assigned_to`, `notes`, `image`, `user_id`, `created_at`, `updated_at`, `physical`, `deleted_at`, `status_id`, `archived`, `warranty_months`, `depreciate`, `supplier_id`, `requestable`, `rtd_location_id`, `_snipeit_mac_address_1`, `accepted`, `last_checkout`, `expected_checkin`, `company_id`, `assigned_type`, `last_audit_date`, `next_audit_date`, `location_id`, `checkin_counter`, `checkout_counter`, `requests_counter`, `latitude`, `longitude`, `audit_status_id`) VALUES
(1, 'laoptop', '72345689', 1, '634797678678', '2021-07-16', '124.00', '3e65476y876', NULL, 'nn', NULL, 44, '2021-07-16 06:17:57', '2021-07-27 05:16:57', 1, NULL, 2, 0, 12, NULL, 1, 1, 15, NULL, NULL, NULL, NULL, 1, 'App\\Models\\Location', NULL, NULL, NULL, 1, 1, 0, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `asset_logs`
--

CREATE TABLE `asset_logs` (
  `id` int(10) UNSIGNED NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `action_type` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `asset_id` int(11) NOT NULL,
  `checkedout_to` int(11) DEFAULT NULL,
  `location_id` int(11) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `asset_type` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `note` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `filename` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `requested_at` datetime DEFAULT NULL,
  `accepted_at` datetime DEFAULT NULL,
  `accessory_id` int(11) DEFAULT NULL,
  `accepted_id` int(11) DEFAULT NULL,
  `consumable_id` int(11) DEFAULT NULL,
  `expected_checkin` date DEFAULT NULL,
  `component_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `asset_maintenances`
--

CREATE TABLE `asset_maintenances` (
  `id` int(10) UNSIGNED NOT NULL,
  `asset_id` int(10) UNSIGNED NOT NULL,
  `supplier_id` int(10) UNSIGNED NOT NULL,
  `asset_maintenance_type` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `title` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `is_warranty` tinyint(1) NOT NULL,
  `start_date` date NOT NULL,
  `completion_date` date DEFAULT NULL,
  `asset_maintenance_time` int(11) DEFAULT NULL,
  `notes` longtext COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `cost` decimal(20,2) DEFAULT NULL,
  `deleted_at` datetime DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `asset_uploads`
--

CREATE TABLE `asset_uploads` (
  `id` int(10) UNSIGNED NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `filename` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `asset_id` int(11) NOT NULL,
  `filenotes` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

CREATE TABLE `categories` (
  `id` int(10) UNSIGNED NOT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `eula_text` longtext COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `use_default_eula` tinyint(1) NOT NULL DEFAULT 0,
  `require_acceptance` tinyint(1) NOT NULL DEFAULT 0,
  `category_type` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT 'asset',
  `checkin_email` tinyint(1) NOT NULL DEFAULT 0,
  `image` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`id`, `name`, `created_at`, `updated_at`, `user_id`, `deleted_at`, `eula_text`, `use_default_eula`, `require_acceptance`, `category_type`, `checkin_email`, `image`) VALUES
(1, 'category 1', '2021-06-03 11:33:45', '2021-06-03 11:33:45', NULL, NULL, NULL, 0, 0, 'License', 0, NULL),
(2, 'category 2', '2021-06-03 11:45:46', '2021-06-03 11:45:46', NULL, NULL, NULL, 0, 0, 'License', 0, NULL),
(3, 'category 3', '2021-06-03 12:22:50', '2021-06-03 12:22:50', NULL, NULL, NULL, 0, 0, 'License', 0, NULL),
(4, 'category 4', '2021-06-03 12:31:48', '2021-06-03 12:31:48', NULL, NULL, NULL, 0, 0, 'License', 0, NULL),
(5, 'category 6', '2021-06-03 12:33:42', '2021-06-03 12:33:42', NULL, NULL, NULL, 0, 0, 'License', 0, NULL),
(6, 'Keyboard', '2021-07-09 07:46:58', '2021-07-09 07:46:58', NULL, NULL, NULL, 0, 0, 'Asset', 0, NULL),
(7, 'Keyboard1', '2021-07-09 07:48:09', '2021-07-09 07:48:09', NULL, NULL, NULL, 0, 0, 'Asset', 0, NULL),
(8, 'cat test11', '2021-07-09 07:54:41', '2021-07-09 07:54:41', NULL, NULL, NULL, 0, 0, 'Asset', 0, NULL),
(9, 'Keyboardtest', '2021-07-10 09:07:25', '2021-07-10 09:07:25', NULL, NULL, NULL, 0, 0, 'Asset', 0, NULL),
(10, 'Keyboardnew', '2021-07-10 09:11:52', '2021-07-10 09:11:52', NULL, NULL, NULL, 0, 0, 'Asset', 0, NULL),
(11, 'Keyboardtt', '2021-07-10 09:18:40', '2021-07-10 09:18:40', NULL, NULL, NULL, 0, 0, 'Asset', 0, NULL),
(12, 'Drive', '2021-07-10 09:33:27', '2021-07-10 09:34:44', 55, '2021-07-10 09:34:44', NULL, 0, 0, 'asset', 0, NULL),
(13, 'Drive1', '2021-07-10 09:35:06', '2021-07-10 09:35:06', NULL, NULL, NULL, 0, 0, 'Component', 0, NULL),
(14, 'Drive2', '2021-07-10 09:44:01', '2021-07-10 09:44:01', NULL, NULL, NULL, 0, 0, 'Component', 0, NULL),
(15, 'Keyboard6', '2021-07-10 10:03:04', '2021-07-10 10:03:04', NULL, NULL, NULL, 0, 0, 'Consumable', 0, NULL),
(16, 'Keyboard7', '2021-07-10 10:10:00', '2021-07-10 10:10:00', NULL, NULL, NULL, 0, 0, 'Consumable', 0, NULL),
(17, 'cat test1166', '2021-07-10 10:39:04', '2021-07-10 10:39:04', NULL, NULL, NULL, 0, 0, 'Accessory', 0, NULL),
(18, 'Keyboard99', '2021-07-10 10:45:59', '2021-07-10 10:45:59', NULL, NULL, NULL, 0, 0, 'Accessory', 0, NULL),
(19, 'office softwaretest', '2021-07-10 10:57:14', '2021-07-10 10:57:14', NULL, NULL, NULL, 0, 0, 'License', 0, NULL),
(20, 'Keyboard000', '2021-07-10 11:23:46', '2021-07-10 11:23:46', NULL, NULL, NULL, 0, 0, 'License', 0, NULL),
(21, 'Keyboardooooo', '2021-07-10 11:33:39', '2021-07-10 11:33:39', NULL, NULL, NULL, 0, 0, 'License', 0, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `checkout_acceptances`
--

CREATE TABLE `checkout_acceptances` (
  `id` int(10) UNSIGNED NOT NULL,
  `checkoutable_type` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `checkoutable_id` bigint(20) UNSIGNED NOT NULL,
  `assigned_to_id` int(10) UNSIGNED NOT NULL,
  `signature_filename` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `accepted_at` timestamp NULL DEFAULT NULL,
  `declined_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `checkout_requests`
--

CREATE TABLE `checkout_requests` (
  `id` int(10) UNSIGNED NOT NULL,
  `user_id` int(11) NOT NULL,
  `requestable_id` int(11) NOT NULL,
  `requestable_type` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `quantity` int(11) NOT NULL DEFAULT 1,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `canceled_at` datetime DEFAULT NULL,
  `fulfilled_at` datetime DEFAULT NULL,
  `deleted_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `companies`
--

CREATE TABLE `companies` (
  `id` int(10) UNSIGNED NOT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `image` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `companies`
--

INSERT INTO `companies` (`id`, `name`, `created_at`, `updated_at`, `image`, `deleted_at`) VALUES
(1, 'test company', '2021-06-03 12:33:12', '2021-06-03 12:33:12', NULL, NULL),
(2, 'test company2', '2021-06-16 14:15:23', '2021-06-16 14:15:23', NULL, NULL),
(3, 'test company3', '2021-06-16 14:15:51', '2021-06-16 14:15:51', NULL, NULL),
(4, 'test company4', '2021-06-16 14:15:58', '2021-06-16 14:15:58', NULL, NULL),
(5, '5', '2021-06-16 14:16:03', '2021-06-16 14:16:03', NULL, NULL),
(6, '6', '2021-06-16 14:16:07', '2021-06-16 14:16:07', NULL, NULL),
(7, '7', '2021-06-16 14:16:13', '2021-06-16 14:16:13', NULL, NULL),
(8, '8', '2021-06-16 14:16:17', '2021-06-16 14:16:17', NULL, NULL),
(9, '9', '2021-06-16 14:16:22', '2021-06-16 14:16:22', NULL, NULL),
(10, '10', '2021-06-16 14:16:28', '2021-06-16 14:16:28', NULL, NULL),
(11, 'c11', '2021-06-16 14:16:33', '2021-06-18 10:21:54', NULL, NULL),
(12, '13', '2021-06-18 10:10:29', '2021-06-18 10:10:32', NULL, '2021-06-18 10:10:32'),
(13, '14', '2021-06-18 10:21:39', '2021-06-18 10:21:46', NULL, '2021-06-18 10:21:46'),
(14, 'c12', '2021-07-19 14:49:56', '2021-07-19 14:49:56', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `components`
--

CREATE TABLE `components` (
  `id` int(10) UNSIGNED NOT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `category_id` int(11) DEFAULT NULL,
  `location_id` int(11) DEFAULT NULL,
  `company_id` int(11) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  `qty` int(11) NOT NULL DEFAULT 1,
  `order_number` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `purchase_date` date DEFAULT NULL,
  `purchase_cost` decimal(20,2) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `min_amt` int(11) DEFAULT NULL,
  `serial` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `image` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `components`
--

INSERT INTO `components` (`id`, `name`, `category_id`, `location_id`, `company_id`, `user_id`, `qty`, `order_number`, `purchase_date`, `purchase_cost`, `created_at`, `updated_at`, `deleted_at`, `min_amt`, `serial`, `image`) VALUES
(1, '18 Volt 2.6 amp AC-E1826L1', 14, 14, 1, 55, 6, '356788g675fth', '2021-07-10', '124.00', '2021-07-10 09:40:10', '2021-07-10 09:44:33', NULL, 1, '634797678678', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `components_assets`
--

CREATE TABLE `components_assets` (
  `id` int(10) UNSIGNED NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `assigned_qty` int(11) DEFAULT 1,
  `component_id` int(11) DEFAULT NULL,
  `asset_id` int(11) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `consumables`
--

CREATE TABLE `consumables` (
  `id` int(10) UNSIGNED NOT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `category_id` int(11) DEFAULT NULL,
  `location_id` int(11) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  `qty` int(11) NOT NULL DEFAULT 0,
  `requestable` tinyint(1) NOT NULL DEFAULT 0,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `purchase_date` date DEFAULT NULL,
  `purchase_cost` decimal(20,2) DEFAULT NULL,
  `order_number` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `company_id` int(10) UNSIGNED DEFAULT NULL,
  `min_amt` int(11) DEFAULT NULL,
  `model_number` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `manufacturer_id` int(11) DEFAULT NULL,
  `item_no` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `image` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `consumables`
--

INSERT INTO `consumables` (`id`, `name`, `category_id`, `location_id`, `user_id`, `qty`, `requestable`, `created_at`, `updated_at`, `deleted_at`, `purchase_date`, `purchase_cost`, `order_number`, `company_id`, `min_amt`, `model_number`, `manufacturer_id`, `item_no`, `image`) VALUES
(1, 'computer cable', 16, 15, 55, 5, 0, '2021-07-10 10:04:57', '2021-07-10 10:10:35', NULL, '2021-07-10', '124.00', '356788', 1, 1, '56485VHF654', 12, 'fchnbgvf465r4', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `consumables_users`
--

CREATE TABLE `consumables_users` (
  `id` int(10) UNSIGNED NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `consumable_id` int(11) DEFAULT NULL,
  `assigned_to` int(11) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `custom_fields`
--

CREATE TABLE `custom_fields` (
  `id` int(10) UNSIGNED NOT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `format` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `element` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  `field_values` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `field_encrypted` tinyint(1) NOT NULL DEFAULT 0,
  `db_column` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `help_text` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `show_in_email` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `custom_fieldsets`
--

CREATE TABLE `custom_fieldsets` (
  `id` int(10) UNSIGNED NOT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `custom_field_custom_fieldset`
--

CREATE TABLE `custom_field_custom_fieldset` (
  `custom_field_id` int(11) NOT NULL,
  `custom_fieldset_id` int(11) NOT NULL,
  `order` int(11) NOT NULL,
  `required` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `departments`
--

CREATE TABLE `departments` (
  `id` int(10) UNSIGNED NOT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_id` int(11) NOT NULL,
  `company_id` int(11) DEFAULT NULL,
  `location_id` int(11) DEFAULT NULL,
  `manager_id` int(11) DEFAULT NULL,
  `notes` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `image` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `departments`
--

INSERT INTO `departments` (`id`, `name`, `user_id`, `company_id`, `location_id`, `manager_id`, `notes`, `created_at`, `updated_at`, `deleted_at`, `image`) VALUES
(1, 'd1', 56, 1, 1, 44, NULL, '2021-07-10 06:53:18', '2021-07-10 06:53:18', NULL, NULL),
(2, 'd2', 55, 9, 11, 44, NULL, '2021-07-10 07:09:14', '2021-07-10 08:52:29', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `depreciations`
--

CREATE TABLE `depreciations` (
  `id` int(10) UNSIGNED NOT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `months` int(11) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `depreciations`
--

INSERT INTO `depreciations` (`id`, `name`, `months`, `created_at`, `updated_at`, `user_id`, `deleted_at`) VALUES
(1, 'Declining Balance Depreciation', 54, '2021-07-09 07:47:35', '2021-07-09 07:47:35', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `firm_logo`
--

CREATE TABLE `firm_logo` (
  `id` int(11) NOT NULL,
  `description` varchar(500) NOT NULL,
  `firm_id` int(11) NOT NULL,
  `image` varchar(500) NOT NULL,
  `user_id` int(11) NOT NULL,
  `created_by` int(11) NOT NULL,
  `updated_by` int(11) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `imports`
--

CREATE TABLE `imports` (
  `id` int(10) UNSIGNED NOT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `file_path` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `filesize` int(11) NOT NULL,
  `import_type` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `header_row` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `first_row` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `field_map` text COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `kits`
--

CREATE TABLE `kits` (
  `id` int(10) UNSIGNED NOT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `kits_accessories`
--

CREATE TABLE `kits_accessories` (
  `id` int(10) UNSIGNED NOT NULL,
  `kit_id` int(11) DEFAULT NULL,
  `accessory_id` int(11) DEFAULT NULL,
  `quantity` int(11) NOT NULL DEFAULT 1,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `kits_consumables`
--

CREATE TABLE `kits_consumables` (
  `id` int(10) UNSIGNED NOT NULL,
  `kit_id` int(11) DEFAULT NULL,
  `consumable_id` int(11) DEFAULT NULL,
  `quantity` int(11) NOT NULL DEFAULT 1,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `kits_licenses`
--

CREATE TABLE `kits_licenses` (
  `id` int(10) UNSIGNED NOT NULL,
  `kit_id` int(11) DEFAULT NULL,
  `license_id` int(11) DEFAULT NULL,
  `quantity` int(11) NOT NULL DEFAULT 1,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `kits_models`
--

CREATE TABLE `kits_models` (
  `id` int(10) UNSIGNED NOT NULL,
  `kit_id` int(11) DEFAULT NULL,
  `model_id` int(11) DEFAULT NULL,
  `quantity` int(11) NOT NULL DEFAULT 1,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `licenses`
--

CREATE TABLE `licenses` (
  `id` int(10) UNSIGNED NOT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `serial` varchar(2048) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `purchase_date` date DEFAULT NULL,
  `purchase_cost` decimal(20,2) DEFAULT NULL,
  `order_number` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `seats` int(11) NOT NULL DEFAULT 1,
  `notes` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  `depreciation_id` int(11) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `license_name` varchar(120) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `license_email` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `depreciate` tinyint(1) DEFAULT NULL,
  `supplier_id` int(11) DEFAULT NULL,
  `expiration_date` date DEFAULT NULL,
  `purchase_order` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `termination_date` date DEFAULT NULL,
  `maintained` tinyint(1) DEFAULT NULL,
  `reassignable` tinyint(1) NOT NULL DEFAULT 1,
  `company_id` int(10) UNSIGNED DEFAULT NULL,
  `manufacturer_id` int(11) DEFAULT NULL,
  `category_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `licenses`
--

INSERT INTO `licenses` (`id`, `name`, `serial`, `purchase_date`, `purchase_cost`, `order_number`, `seats`, `notes`, `user_id`, `depreciation_id`, `created_at`, `updated_at`, `deleted_at`, `license_name`, `license_email`, `depreciate`, `supplier_id`, `expiration_date`, `purchase_order`, `termination_date`, `maintained`, `reassignable`, `company_id`, `manufacturer_id`, `category_id`) VALUES
(1, 'Dot Net', 'bb bbb', '2021-06-05', '1000.00', '1', 10, 'bcjbs jkfbkjdh', 56, NULL, '2021-06-03 12:35:34', '2021-07-09 07:48:37', NULL, 'Vidhya', 'hp@hp.com', NULL, 3, '2021-06-10', '111', '2021-06-25', 1, 1, 1, 1, 5),
(2, 'test licenses 1', 'ggg', '2021-07-10', '124.00', '356788', 8, 'nnnn', 55, NULL, '2021-07-10 10:58:20', '2021-07-10 11:24:51', '2021-07-10 11:24:51', 'renisha', 'renisha@gmail.com', NULL, 6, '2021-07-24', '64547', '2021-08-07', 1, 1, 4, 14, 19),
(3, 'windoes test', 'nn', '2021-07-10', '124.00', '356788g675fth', 8, 'mmm', 55, NULL, '2021-07-10 11:24:40', '2021-07-10 11:24:45', '2021-07-10 11:24:45', 'renisha', 'jjjjjj@gmail.com', NULL, 1, '2021-07-11', '64547', '2021-07-10', 1, 1, 1, 14, 20),
(4, 'Dot Net', 'bb bbb', '2021-06-05', '1000.00', '1', 10, 'bcjbs jkfbkjdh', 55, NULL, '2021-07-10 11:34:01', '2021-07-10 11:34:06', '2021-07-10 11:34:06', 'Vidhya', 'hp@hp.com', NULL, 3, '2021-06-10', '111', '2021-06-25', 1, 1, 1, 1, 21);

-- --------------------------------------------------------

--
-- Table structure for table `license_seats`
--

CREATE TABLE `license_seats` (
  `id` int(10) UNSIGNED NOT NULL,
  `license_id` int(11) DEFAULT NULL,
  `assigned_to` int(11) DEFAULT NULL,
  `notes` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `asset_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `license_seats`
--

INSERT INTO `license_seats` (`id`, `license_id`, `assigned_to`, `notes`, `user_id`, `created_at`, `updated_at`, `deleted_at`, `asset_id`) VALUES
(1, 1, 57, 'nnn', 56, '2021-06-03 12:35:34', '2021-07-09 10:42:09', NULL, NULL),
(2, 2, NULL, NULL, NULL, '2021-07-10 10:58:20', '2021-07-10 10:58:20', NULL, NULL),
(3, 2, NULL, NULL, NULL, '2021-07-10 10:58:20', '2021-07-10 10:58:20', NULL, NULL),
(4, 2, NULL, NULL, NULL, '2021-07-10 10:58:20', '2021-07-10 10:58:20', NULL, NULL),
(5, 2, NULL, NULL, NULL, '2021-07-10 10:58:20', '2021-07-10 10:58:20', NULL, NULL),
(6, 2, NULL, NULL, NULL, '2021-07-10 10:58:20', '2021-07-10 10:58:20', NULL, NULL),
(7, 2, NULL, NULL, NULL, '2021-07-10 10:58:20', '2021-07-10 10:58:20', NULL, NULL),
(8, 2, NULL, NULL, NULL, '2021-07-10 10:58:20', '2021-07-10 10:58:20', NULL, NULL),
(9, 2, NULL, NULL, NULL, '2021-07-10 10:58:20', '2021-07-10 10:58:20', NULL, NULL),
(10, 3, NULL, NULL, NULL, '2021-07-10 11:24:40', '2021-07-10 11:24:40', NULL, NULL),
(11, 3, NULL, NULL, NULL, '2021-07-10 11:24:40', '2021-07-10 11:24:40', NULL, NULL),
(12, 3, NULL, NULL, NULL, '2021-07-10 11:24:40', '2021-07-10 11:24:40', NULL, NULL),
(13, 3, NULL, NULL, NULL, '2021-07-10 11:24:40', '2021-07-10 11:24:40', NULL, NULL),
(14, 3, NULL, NULL, NULL, '2021-07-10 11:24:40', '2021-07-10 11:24:40', NULL, NULL),
(15, 3, NULL, NULL, NULL, '2021-07-10 11:24:40', '2021-07-10 11:24:40', NULL, NULL),
(16, 3, NULL, NULL, NULL, '2021-07-10 11:24:40', '2021-07-10 11:24:40', NULL, NULL),
(17, 3, NULL, NULL, NULL, '2021-07-10 11:24:40', '2021-07-10 11:24:40', NULL, NULL),
(18, 4, NULL, NULL, NULL, '2021-07-10 11:34:01', '2021-07-10 11:34:01', NULL, NULL),
(19, 4, NULL, NULL, NULL, '2021-07-10 11:34:01', '2021-07-10 11:34:01', NULL, NULL),
(20, 4, NULL, NULL, NULL, '2021-07-10 11:34:01', '2021-07-10 11:34:01', NULL, NULL),
(21, 4, NULL, NULL, NULL, '2021-07-10 11:34:01', '2021-07-10 11:34:01', NULL, NULL),
(22, 4, NULL, NULL, NULL, '2021-07-10 11:34:01', '2021-07-10 11:34:01', NULL, NULL),
(23, 4, NULL, NULL, NULL, '2021-07-10 11:34:01', '2021-07-10 11:34:01', NULL, NULL),
(24, 4, NULL, NULL, NULL, '2021-07-10 11:34:01', '2021-07-10 11:34:01', NULL, NULL),
(25, 4, NULL, NULL, NULL, '2021-07-10 11:34:01', '2021-07-10 11:34:01', NULL, NULL),
(26, 4, NULL, NULL, NULL, '2021-07-10 11:34:01', '2021-07-10 11:34:01', NULL, NULL),
(27, 4, NULL, NULL, NULL, '2021-07-10 11:34:01', '2021-07-10 11:34:01', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `locations`
--

CREATE TABLE `locations` (
  `id` int(10) UNSIGNED NOT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `city` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `state` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `country` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  `address` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `address2` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `zip` varchar(10) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `parent_id` int(11) DEFAULT NULL,
  `currency` varchar(10) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `ldap_ou` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `manager_id` int(11) DEFAULT NULL,
  `image` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `locations`
--

INSERT INTO `locations` (`id`, `name`, `city`, `state`, `country`, `created_at`, `updated_at`, `user_id`, `address`, `address2`, `zip`, `deleted_at`, `parent_id`, `currency`, `ldap_ou`, `manager_id`, `image`) VALUES
(1, 'china', 'chennai', NULL, 'ALB', '2021-07-10 06:46:57', '2021-07-10 06:46:57', 56, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(2, 'china1', 'chennai', NULL, 'ALB', '2021-07-10 06:59:30', '2021-07-10 07:38:21', 55, NULL, NULL, NULL, '2021-07-10 07:38:21', NULL, NULL, NULL, NULL, NULL),
(3, 'mumbai', 'chennai', NULL, 'ALB', '2021-07-10 06:59:54', '2021-07-10 06:59:54', 56, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(4, 'chinaTTTTTTTT', 'chennai', NULL, 'ALA', '2021-07-10 07:01:20', '2021-07-10 07:38:24', 55, NULL, NULL, NULL, '2021-07-10 07:38:24', NULL, NULL, NULL, NULL, NULL),
(5, 'china6', 'chennai', NULL, 'ALB', '2021-07-10 07:05:24', '2021-07-10 07:38:27', 55, NULL, NULL, NULL, '2021-07-10 07:38:27', NULL, NULL, NULL, NULL, NULL),
(6, 'Netherland', 'chennai', NULL, 'ASM', '2021-07-10 07:06:38', '2021-07-10 07:06:38', 56, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(7, 'delhi', 'chennai', NULL, 'ALB', '2021-07-10 07:07:55', '2021-07-10 07:07:55', 56, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(8, 'chinauu', 'chennai', NULL, 'ALA', '2021-07-10 07:36:07', '2021-07-10 07:38:31', 55, NULL, NULL, NULL, '2021-07-10 07:38:31', NULL, NULL, NULL, NULL, NULL),
(9, 'Netherland111', 'chennai', NULL, 'AZE', '2021-07-10 07:36:40', '2021-07-10 07:38:17', 55, NULL, NULL, NULL, '2021-07-10 07:38:17', NULL, NULL, NULL, NULL, NULL),
(10, 'chinaTTTTTTTT11', 'chennai', NULL, 'ALB', '2021-07-10 07:38:00', '2021-07-10 07:38:14', 55, NULL, NULL, NULL, '2021-07-10 07:38:14', NULL, NULL, NULL, NULL, NULL),
(11, 'korea', 'chennai', NULL, 'ALA', '2021-07-10 08:52:25', '2021-07-10 08:52:25', 55, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(12, 'Maharastra', NULL, NULL, NULL, '2021-07-10 09:38:14', '2021-07-10 09:38:14', 55, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(13, 'Karnataka', NULL, NULL, NULL, '2021-07-10 09:39:00', '2021-07-10 09:39:00', 55, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(14, 'dubai', NULL, NULL, NULL, '2021-07-10 09:44:26', '2021-07-10 09:44:26', 55, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(15, 'africa', 'chennai', NULL, 'ALA', '2021-07-10 10:10:30', '2021-07-10 10:10:30', 55, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(16, 'Netherlandtest', NULL, NULL, NULL, '2021-07-10 10:40:28', '2021-07-10 10:40:28', 55, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(17, 'china888', 'chennai', 'tn', 'ALA', '2021-07-10 10:47:20', '2021-07-17 05:26:45', 56, 'chennai', 'chennai', '675', NULL, 16, '123', NULL, 58, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `login_attempts`
--

CREATE TABLE `login_attempts` (
  `id` int(10) UNSIGNED NOT NULL,
  `username` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `remote_ip` varchar(45) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `user_agent` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `successful` tinyint(1) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `manufacturers`
--

CREATE TABLE `manufacturers` (
  `id` int(10) UNSIGNED NOT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `url` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `support_url` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `support_phone` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `support_email` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `image` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `manufacturers`
--

INSERT INTO `manufacturers` (`id`, `name`, `created_at`, `updated_at`, `user_id`, `deleted_at`, `url`, `support_url`, `support_phone`, `support_email`, `image`) VALUES
(1, 'manufacturer 1', '2021-06-03 12:34:12', '2021-06-03 12:59:25', 44, NULL, NULL, NULL, NULL, NULL, NULL),
(2, 'CanManCom', '2021-07-09 07:09:15', '2021-07-09 07:11:24', 56, NULL, 'www.CanMan.com', 'www.CanMan.com', '5678909876', 'CanMan@gmail.com', NULL),
(3, 'CanMa', '2021-07-09 07:14:54', '2021-07-09 07:14:54', 56, NULL, 'www.CanMan.com', 'www.CanMan.com', '09865545345', 'sad@gmail.com', NULL),
(4, 'SOLARIS', '2021-07-09 07:20:18', '2021-07-09 07:20:21', 56, '2021-07-09 07:20:21', 'www.CanMan.com', 'www.CanMan.com', '09865545345', 'jjjjjj@gmail.com', NULL),
(5, 'SOLARISSSSS', '2021-07-09 07:22:23', '2021-07-09 07:22:27', 56, '2021-07-09 07:22:27', 'www.CanMan.com', 'www.CanMan.com', '09865545345', 'jjjjjj@gmail.com', NULL),
(6, 'manu fac 1', '2021-07-09 07:46:41', '2021-07-09 07:46:41', 56, NULL, NULL, NULL, NULL, NULL, NULL),
(7, 'manu fact2', '2021-07-09 07:47:53', '2021-07-09 07:47:53', 56, NULL, NULL, NULL, NULL, NULL, NULL),
(8, 'divyaman', '2021-07-09 07:54:32', '2021-07-09 07:54:32', 56, NULL, NULL, NULL, NULL, NULL, NULL),
(9, 'CanManComtest', '2021-07-10 09:02:12', '2021-07-10 09:02:12', 55, NULL, NULL, NULL, NULL, NULL, NULL),
(10, 'CanManComtest5', '2021-07-10 09:18:23', '2021-07-10 09:18:23', 55, NULL, NULL, NULL, NULL, NULL, NULL),
(11, 'CanManComtest7', '2021-07-10 10:04:21', '2021-07-10 10:04:21', 55, NULL, NULL, NULL, NULL, NULL, NULL),
(12, 'CanManComtest88', '2021-07-10 10:10:13', '2021-07-10 10:10:13', 55, NULL, NULL, NULL, NULL, NULL, NULL),
(13, 'CanManComtestghf', '2021-07-10 10:46:23', '2021-07-10 10:46:23', 55, NULL, NULL, NULL, NULL, NULL, NULL),
(14, 'CanManComtesthhhh', '2021-07-10 10:57:37', '2021-07-10 10:57:37', 55, NULL, NULL, NULL, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `migrations`
--

CREATE TABLE `migrations` (
  `id` int(10) UNSIGNED NOT NULL,
  `migration` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `batch` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `models`
--

CREATE TABLE `models` (
  `id` int(10) UNSIGNED NOT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `model_number` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `manufacturer_id` int(11) DEFAULT NULL,
  `category_id` int(11) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `depreciation_id` int(11) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  `eol` int(11) DEFAULT NULL,
  `image` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `deprecated_mac_address` tinyint(1) NOT NULL DEFAULT 0,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `fieldset_id` int(11) DEFAULT NULL,
  `notes` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `requestable` tinyint(4) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `models`
--

INSERT INTO `models` (`id`, `name`, `model_number`, `manufacturer_id`, `category_id`, `created_at`, `updated_at`, `depreciation_id`, `user_id`, `eol`, `image`, `deprecated_mac_address`, `deleted_at`, `fieldset_id`, `notes`, `requestable`) VALUES
(1, 'Apple MGND3HNA MacBook Ai ', '56485VHF654', 7, 7, '2021-07-09 07:48:23', '2021-07-09 07:48:23', 1, 56, 3246, NULL, 0, NULL, NULL, 'bbb', 1),
(2, 'Apple MGND3HNA MacBook Ai ', '56485VHF654', 8, 8, '2021-07-09 07:54:57', '2021-07-09 07:54:57', 1, 56, 3246, NULL, 0, NULL, NULL, 'nnn', 1),
(3, 'HP SPECTRE X360 15', '56485VHF654', 9, 7, '2021-07-10 09:02:44', '2021-07-10 09:02:44', 1, 55, 3246, NULL, 0, NULL, NULL, 'nnn', 1),
(4, 'Apple MGND3HNA MacBook1232', '56485VHF654', 9, 9, '2021-07-10 09:07:47', '2021-07-19 06:41:48', 1, 61, 3246, NULL, 0, NULL, NULL, 'mmmnnn', 1),
(5, 'Apple MGND3HNA MacBook123', '56485VHF654', 10, 11, '2021-07-10 09:18:44', '2021-07-10 09:18:49', 1, 55, 3246, NULL, 0, '2021-07-10 09:18:49', NULL, 'mmm', 1),
(6, 'Apple MGND3HNA MacBook1232jj', '56485VHF654', 9, 9, '2021-07-19 06:48:35', '2021-07-19 06:52:48', 1, 61, 3246, NULL, 0, NULL, NULL, 'mmmnnnbb', 1),
(7, 'test', '56485VHF654', 3, 6, '2021-07-26 10:21:55', '2021-07-26 10:21:55', NULL, 56, NULL, NULL, 0, NULL, NULL, NULL, 0),
(8, 'test', '56485VHF654', 9, 7, '2021-07-26 10:22:21', '2021-07-26 10:22:21', NULL, 56, NULL, NULL, 0, NULL, NULL, NULL, 0);

-- --------------------------------------------------------

--
-- Table structure for table `models_custom_fields`
--

CREATE TABLE `models_custom_fields` (
  `id` int(10) UNSIGNED NOT NULL,
  `asset_model_id` int(11) NOT NULL,
  `custom_field_id` int(11) NOT NULL,
  `default_value` text COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `oauth_access_tokens`
--

CREATE TABLE `oauth_access_tokens` (
  `id` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_id` bigint(20) UNSIGNED DEFAULT NULL,
  `client_id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `scopes` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `revoked` tinyint(1) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `expires_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `oauth_auth_codes`
--

CREATE TABLE `oauth_auth_codes` (
  `id` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `client_id` bigint(20) UNSIGNED NOT NULL,
  `scopes` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `revoked` tinyint(1) NOT NULL,
  `expires_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `oauth_clients`
--

CREATE TABLE `oauth_clients` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `user_id` bigint(20) UNSIGNED DEFAULT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `secret` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `redirect` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `personal_access_client` tinyint(1) NOT NULL,
  `password_client` tinyint(1) NOT NULL,
  `revoked` tinyint(1) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `oauth_personal_access_clients`
--

CREATE TABLE `oauth_personal_access_clients` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `client_id` bigint(20) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `oauth_refresh_tokens`
--

CREATE TABLE `oauth_refresh_tokens` (
  `id` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `access_token_id` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `revoked` tinyint(1) NOT NULL,
  `expires_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `password_resets`
--

CREATE TABLE `password_resets` (
  `email` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `permission_groups`
--

CREATE TABLE `permission_groups` (
  `id` int(10) UNSIGNED NOT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `permissions` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `permission_groups`
--

INSERT INTO `permission_groups` (`id`, `name`, `permissions`, `created_at`, `updated_at`) VALUES
(1, 'admingroup', '{\"superuser\":\"1\",\"admin\":true,\"import\":true,\"reportview\":true,\"assetsaudit\":true,\"assetscheckin\":true,\"assetscheckout\":true,\"assetscreate\":true,\"assetsdelete\":true,\"assetsedit\":true,\"assetsview\":true,\"assetsviewrequestable\":true,\"accessoriescheckin\":true,\"accessoriescheckout\":true,\"accessoriescreate\":true,\"accessoriesdelete\":true,\"accessoriesedit\":true,\"accessoriesview\":true,\"consumablescheckout\":true,\"consumablescreate\":true,\"consumablesdelete\":true,\"consumablesedit\":true,\"consumablesview\":true,\"licenseskeys\":true,\"licensescheckout\":true,\"licensescreate\":true,\"licensesdelete\":true,\"licensesedit\":true,\"licensesview\":true,\"componentscheckin\":true,\"componentscheckout\":true,\"componentscreate\":true,\"componentsdelete\":true,\"componentsedit\":true,\"componentsview\":true,\"kitscheckout\":true,\"kitscreate\":true,\"kitsdelete\":true,\"kitsedit\":true,\"kitsview\":true,\"userscreate\":true,\"usersdelete\":true,\"usersedit\":true,\"usersview\":true,\"modelscreate\":true,\"modelsdelete\":true,\"modelsedit\":true,\"modelsview\":true,\"departmentscreate\":true,\"departmentsdelete\":true,\"departmentsedit\":true,\"departmentsview\":true,\"statuslabelscreate\":true,\"statuslabelsdelete\":true,\"statuslabelsedit\":true,\"statuslabelsview\":true,\"customfieldscreate\":true,\"customfieldsdelete\":true,\"customfieldsedit\":true,\"customfieldsview\":true,\"categoriescreate\":true,\"categoriesdelete\":true,\"categoriesedit\":true,\"categoriesview\":true,\"supplierscreate\":true,\"suppliersdelete\":true,\"suppliersedit\":true,\"suppliersview\":true,\"manufacturerscreate\":true,\"manufacturersdelete\":true,\"manufacturersedit\":true,\"manufacturersview\":true,\"depreciationscreate\":true,\"depreciationsdelete\":true,\"depreciationsedit\":true,\"depreciationsview\":true,\"locationscreate\":true,\"locationsdelete\":true,\"locationsedit\":true,\"locationsview\":true,\"companiescreate\":true,\"companiesdelete\":true,\"companiesedit\":true,\"companiesview\":true,\"selftwo_factor\":true,\"selfapi\":true,\"selfedit_location\":true,\"selfcheckout_assets\":true}\r\n', '2021-01-17 02:57:37', '2021-01-17 02:57:37'),
(4, 'non admin', '{\"superuser\":\"0\",\"admin\":true,\"import\":true,\"reportview\":true,\"assetsaudit\":true,\"assetscheckin\":true,\"assetscheckout\":true,\"assetscreate\":true,\"assetsdelete\":true,\"assetsedit\":true,\"assetsview\":true,\"assetsviewrequestable\":true,\"accessoriescheckin\":true,\"accessoriescheckout\":true,\"accessoriescreate\":true,\"accessoriesdelete\":true,\"accessoriesedit\":true,\"accessoriesview\":true,\"consumablescheckout\":true,\"consumablescreate\":true,\"consumablesdelete\":true,\"consumablesedit\":true,\"consumablesview\":true,\"licenseskeys\":true,\"licensescheckout\":true,\"licensescreate\":true,\"licensesdelete\":true,\"licensesedit\":true,\"licensesview\":true,\"componentscheckin\":true,\"componentscheckout\":true,\"componentscreate\":true,\"componentsdelete\":true,\"componentsedit\":true,\"componentsview\":true,\"kitscheckout\":true,\"kitscreate\":true,\"kitsdelete\":true,\"kitsedit\":true,\"kitsview\":true,\"userscreate\":true,\"usersdelete\":true,\"usersedit\":true,\"usersview\":true,\"modelscreate\":true,\"modelsdelete\":true,\"modelsedit\":true,\"modelsview\":true,\"departmentscreate\":true,\"departmentsdelete\":true,\"departmentsedit\":true,\"departmentsview\":true,\"statuslabelscreate\":true,\"statuslabelsdelete\":true,\"statuslabelsedit\":true,\"statuslabelsview\":true,\"customfieldscreate\":true,\"customfieldsdelete\":true,\"customfieldsedit\":true,\"customfieldsview\":true,\"categoriescreate\":true,\"categoriesdelete\":true,\"categoriesedit\":true,\"categoriesview\":true,\"supplierscreate\":true,\"suppliersdelete\":true,\"suppliersedit\":true,\"suppliersview\":true,\"manufacturerscreate\":true,\"manufacturersdelete\":true,\"manufacturersedit\":true,\"manufacturersview\":true,\"depreciationscreate\":true,\"depreciationsdelete\":true,\"depreciationsedit\":true,\"depreciationsview\":true,\"locationscreate\":true,\"locationsdelete\":true,\"locationsedit\":true,\"locationsview\":true,\"companiescreate\":true,\"companiesdelete\":true,\"companiesedit\":true,\"companiesview\":true,\"selftwo_factor\":true,\"selfapi\":true,\"selfedit_location\":true,\"selfcheckout_assets\":true}\r\n', '2021-01-17 02:57:37', '2021-01-17 02:57:37'),
(11, 'test6', '{\"superuser\":1,\"admin\":true,\"import\":true,\"reportview\":true,\"assetsaudit\":true,\"assetscheckin\":true,\"assetscheckout\":true,\"assetscreate\":true,\"assetsdelete\":true,\"assetsedit\":true,\"assetsview\":true,\"assetsviewrequestable\":true,\"accessoriescheckin\":true,\"accessoriescheckout\":true,\"accessoriescreate\":true,\"accessoriesdelete\":true,\"accessoriesedit\":true,\"accessoriesview\":true,\"consumablescheckout\":true,\"consumablescreate\":true,\"consumablesdelete\":true,\"consumablesedit\":true,\"consumablesview\":true,\"licenseskeys\":true,\"licensescheckout\":false,\"licensescreate\":true,\"licensesdelete\":true,\"licensesedit\":true,\"licensesview\":true,\"componentscheckin\":true,\"componentscheckout\":true,\"componentscreate\":true,\"componentsdelete\":true,\"componentsedit\":true,\"componentsview\":true,\"kitscheckout\":true,\"kitscreate\":true,\"kitsdelete\":true,\"kitsedit\":true,\"kitsview\":true,\"userscreate\":true,\"usersdelete\":true,\"usersedit\":true,\"usersview\":true,\"modelscreate\":true,\"modelsdelete\":true,\"modelsedit\":true,\"modelsview\":true,\"departmentscreate\":true,\"departmentsdelete\":true,\"departmentsedit\":true,\"departmentsview\":true,\"statuslabelscreate\":true,\"statuslabelsdelete\":true,\"statuslabelsedit\":true,\"statuslabelsview\":true,\"customfieldscreate\":true,\"customfieldsdelete\":true,\"customfieldsedit\":true,\"customfieldsview\":true,\"categoriescreate\":true,\"categoriesdelete\":true,\"categoriesedit\":true,\"categoriesview\":true,\"supplierscreate\":true,\"suppliersdelete\":true,\"suppliersedit\":true,\"suppliersview\":true,\"manufacturerscreate\":true,\"manufacturersdelete\":true,\"manufacturersedit\":true,\"manufacturersview\":true,\"depreciationscreate\":true,\"depreciationsdelete\":true,\"depreciationsedit\":true,\"depreciationsview\":true,\"locationscreate\":true,\"locationsdelete\":true,\"locationsedit\":true,\"locationsview\":true,\"companiescreate\":true,\"companiesdelete\":true,\"companiesedit\":true,\"companiesview\":true,\"selftwo_factor\":true,\"selfapi\":true,\"selfedit_location\":true,\"selfcheckout_assets\":true}', '2021-07-20 12:57:36', '2021-07-21 04:25:09');

-- --------------------------------------------------------

--
-- Table structure for table `requested_assets`
--

CREATE TABLE `requested_assets` (
  `id` int(10) UNSIGNED NOT NULL,
  `asset_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `accepted_at` datetime DEFAULT NULL,
  `denied_at` datetime DEFAULT NULL,
  `notes` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `requests`
--

CREATE TABLE `requests` (
  `id` int(10) UNSIGNED NOT NULL,
  `asset_id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `request_code` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `settings`
--

CREATE TABLE `settings` (
  `id` int(10) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  `per_page` int(11) NOT NULL DEFAULT 20,
  `site_name` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'Snipe IT Asset Management',
  `qr_code` int(11) DEFAULT NULL,
  `qr_text` varchar(32) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `display_asset_name` int(11) DEFAULT NULL,
  `display_checkout_date` int(11) DEFAULT NULL,
  `display_eol` int(11) DEFAULT NULL,
  `auto_increment_assets` int(11) NOT NULL DEFAULT 0,
  `auto_increment_prefix` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `load_remote` tinyint(1) NOT NULL DEFAULT 1,
  `logo` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `header_color` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `alert_email` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `alerts_enabled` tinyint(1) NOT NULL DEFAULT 1,
  `default_eula_text` longtext COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `barcode_type` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT 'QRCODE',
  `slack_endpoint` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `slack_channel` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `slack_botname` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `default_currency` varchar(10) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `custom_css` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `brand` tinyint(4) NOT NULL DEFAULT 1,
  `ldap_enabled` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `ldap_server` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `ldap_uname` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `ldap_pword` longtext COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `ldap_basedn` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `ldap_filter` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `ldap_username_field` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT 'samaccountname',
  `ldap_lname_field` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT 'sn',
  `ldap_fname_field` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT 'givenname',
  `ldap_auth_filter_query` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT 'uid=samaccountname',
  `ldap_version` int(11) DEFAULT 3,
  `ldap_active_flag` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `ldap_emp_num` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `ldap_email` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `full_multiple_companies_support` tinyint(1) NOT NULL DEFAULT 0,
  `ldap_server_cert_ignore` tinyint(1) NOT NULL DEFAULT 0,
  `locale` varchar(5) COLLATE utf8mb4_unicode_ci DEFAULT 'en',
  `labels_per_page` tinyint(4) NOT NULL DEFAULT 30,
  `labels_width` decimal(6,5) NOT NULL DEFAULT 2.62500,
  `labels_height` decimal(6,5) NOT NULL DEFAULT 1.00000,
  `labels_pmargin_left` decimal(6,5) NOT NULL DEFAULT 0.21975,
  `labels_pmargin_right` decimal(6,5) NOT NULL DEFAULT 0.21975,
  `labels_pmargin_top` decimal(6,5) NOT NULL DEFAULT 0.50000,
  `labels_pmargin_bottom` decimal(6,5) NOT NULL DEFAULT 0.50000,
  `labels_display_bgutter` decimal(6,5) NOT NULL DEFAULT 0.07000,
  `labels_display_sgutter` decimal(6,5) NOT NULL DEFAULT 0.05000,
  `labels_fontsize` tinyint(4) NOT NULL DEFAULT 9,
  `labels_pagewidth` decimal(7,5) NOT NULL DEFAULT 8.50000,
  `labels_pageheight` decimal(7,5) NOT NULL DEFAULT 11.00000,
  `labels_display_name` tinyint(4) NOT NULL DEFAULT 0,
  `labels_display_serial` tinyint(4) NOT NULL DEFAULT 1,
  `labels_display_tag` tinyint(4) NOT NULL DEFAULT 1,
  `alt_barcode` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT 'C128',
  `alt_barcode_enabled` tinyint(1) DEFAULT 1,
  `alert_interval` int(11) DEFAULT 30,
  `alert_threshold` int(11) DEFAULT 5,
  `email_domain` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `email_format` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT 'filastname',
  `username_format` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT 'filastname',
  `is_ad` tinyint(1) NOT NULL DEFAULT 0,
  `ad_domain` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `ldap_port` varchar(5) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '389',
  `ldap_tls` tinyint(1) NOT NULL DEFAULT 0,
  `zerofill_count` int(11) NOT NULL DEFAULT 5,
  `ldap_pw_sync` tinyint(1) NOT NULL DEFAULT 1,
  `two_factor_enabled` tinyint(4) DEFAULT NULL,
  `require_accept_signature` tinyint(1) NOT NULL DEFAULT 0,
  `date_display_format` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'Y-m-d',
  `time_display_format` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'h:i A',
  `next_auto_tag_base` bigint(20) NOT NULL DEFAULT 1,
  `login_note` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `thumbnail_max_h` int(11) DEFAULT 50,
  `pwd_secure_uncommon` tinyint(1) NOT NULL DEFAULT 0,
  `pwd_secure_complexity` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `pwd_secure_min` int(11) NOT NULL DEFAULT 8,
  `audit_interval` int(11) DEFAULT NULL,
  `audit_warning_days` int(11) DEFAULT NULL,
  `show_url_in_emails` tinyint(1) NOT NULL DEFAULT 0,
  `custom_forgot_pass_url` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `show_alerts_in_menu` tinyint(1) NOT NULL DEFAULT 1,
  `labels_display_company_name` tinyint(1) NOT NULL DEFAULT 0,
  `show_archived_in_list` tinyint(1) NOT NULL DEFAULT 0,
  `dashboard_message` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `support_footer` char(5) COLLATE utf8mb4_unicode_ci DEFAULT 'on',
  `footer_text` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `modellist_displays` char(191) COLLATE utf8mb4_unicode_ci DEFAULT 'image,category,manufacturer,model_number',
  `login_remote_user_enabled` tinyint(1) NOT NULL DEFAULT 0,
  `login_common_disabled` tinyint(1) NOT NULL DEFAULT 0,
  `login_remote_user_custom_logout_url` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `skin` char(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `show_images_in_email` tinyint(1) NOT NULL DEFAULT 1,
  `admin_cc_email` char(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `labels_display_model` tinyint(1) NOT NULL DEFAULT 0,
  `privacy_policy_link` char(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `version_footer` char(5) COLLATE utf8mb4_unicode_ci DEFAULT 'on',
  `unique_serial` tinyint(1) NOT NULL DEFAULT 0,
  `logo_print_assets` tinyint(1) NOT NULL DEFAULT 0,
  `depreciation_method` char(10) COLLATE utf8mb4_unicode_ci DEFAULT 'default',
  `favicon` char(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `email_logo` char(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `label_logo` char(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `show_assigned_assets` tinyint(1) NOT NULL DEFAULT 0,
  `login_remote_user_header_name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `ad_append_domain` tinyint(1) NOT NULL DEFAULT 0,
  `saml_enabled` tinyint(1) NOT NULL DEFAULT 0,
  `saml_idp_metadata` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `saml_attr_mapping_username` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `saml_forcelogin` tinyint(1) NOT NULL DEFAULT 0,
  `saml_slo` tinyint(1) NOT NULL DEFAULT 0,
  `saml_sp_x509cert` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `saml_sp_privatekey` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `saml_custom_settings` text COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `severity`
--

CREATE TABLE `severity` (
  `id` int(10) NOT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` varchar(500) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `skill_level`
--

CREATE TABLE `skill_level` (
  `id` int(10) NOT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` varchar(500) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `status_labels`
--

CREATE TABLE `status_labels` (
  `id` int(10) UNSIGNED NOT NULL,
  `name` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `deployable` tinyint(1) NOT NULL DEFAULT 0,
  `pending` tinyint(1) NOT NULL DEFAULT 0,
  `archived` tinyint(1) NOT NULL DEFAULT 0,
  `notes` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `color` varchar(10) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `show_in_nav` tinyint(1) NOT NULL DEFAULT 0,
  `default_label` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `status_labels`
--

INSERT INTO `status_labels` (`id`, `name`, `user_id`, `created_at`, `updated_at`, `deleted_at`, `deployable`, `pending`, `archived`, `notes`, `color`, `show_in_nav`, `default_label`) VALUES
(1, 'undeployable', 44, '2021-05-09 12:09:41', '2021-05-09 12:09:41', NULL, 0, 1, 0, 'u', NULL, 1, 0),
(2, 'deployable', 44, '2021-05-09 12:10:41', '2021-05-09 12:10:41', NULL, 1, 0, 0, 'd', NULL, 1, 0),
(3, 'deployed', 44, '2021-05-09 12:11:04', '2021-05-09 12:11:04', NULL, 0, 0, 1, 'd', NULL, 1, 0);

-- --------------------------------------------------------

--
-- Table structure for table `suppliers`
--

CREATE TABLE `suppliers` (
  `id` int(10) UNSIGNED NOT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `address` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `address2` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `city` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `state` varchar(32) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `country` varchar(5) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `phone` varchar(35) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `fax` varchar(35) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `email` varchar(150) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `contact` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `notes` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `zip` varchar(10) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `url` varchar(250) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `image` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `suppliers`
--

INSERT INTO `suppliers` (`id`, `name`, `address`, `address2`, `city`, `state`, `country`, `phone`, `fax`, `email`, `contact`, `notes`, `created_at`, `updated_at`, `user_id`, `deleted_at`, `zip`, `url`, `image`) VALUES
(1, 'test supplier', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2021-06-03 11:34:57', '2021-06-03 11:34:57', 44, NULL, NULL, NULL, NULL),
(2, 'supplier1', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2021-06-03 12:23:25', '2021-06-03 12:23:25', 44, NULL, NULL, NULL, NULL),
(3, 'supllier 2', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2021-06-03 12:34:36', '2021-06-03 12:34:36', 44, NULL, NULL, NULL, NULL),
(4, 'supplier', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2021-07-10 10:30:57', '2021-07-10 10:30:57', 55, NULL, NULL, NULL, NULL),
(5, 'supplieryy', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2021-07-10 10:46:12', '2021-07-10 10:46:12', 55, NULL, NULL, NULL, NULL),
(6, 'supplierhh', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2021-07-10 10:57:56', '2021-07-10 10:57:56', 55, NULL, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `talent_groups`
--

CREATE TABLE `talent_groups` (
  `id` int(10) NOT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` varchar(500) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `talent_groups`
--

INSERT INTO `talent_groups` (`id`, `name`, `description`, `created_at`, `updated_at`, `user_id`, `deleted_at`) VALUES
(1, 'Electrician', 'electrician desc', '2021-07-02 18:55:01', '2021-07-02 18:55:01', 44, NULL),
(2, 'plumber', 'desc', '2021-07-02 18:55:14', '2021-07-02 18:55:14', 44, NULL),
(3, 'Hardware', 'hw desd', '2021-07-02 18:55:28', '2021-07-02 18:55:28', 44, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `throttle`
--

CREATE TABLE `throttle` (
  `id` int(10) UNSIGNED NOT NULL,
  `user_id` int(10) UNSIGNED DEFAULT NULL,
  `ip_address` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `attempts` int(11) NOT NULL DEFAULT 0,
  `suspended` tinyint(1) NOT NULL DEFAULT 0,
  `banned` tinyint(1) NOT NULL DEFAULT 0,
  `last_attempt_at` timestamp NULL DEFAULT NULL,
  `suspended_at` timestamp NULL DEFAULT NULL,
  `banned_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tickets`
--

CREATE TABLE `tickets` (
  `id` int(11) NOT NULL,
  `description` varchar(500) NOT NULL,
  `asset_tag` varchar(191) NOT NULL,
  `details` text NOT NULL,
  `user_id` int(11) NOT NULL,
  `created_by` int(11) NOT NULL,
  `status_id` int(11) NOT NULL,
  `assigned_to` int(11) DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime DEFAULT NULL,
  `issue_id` int(11) DEFAULT NULL,
  `talent_group_id` int(11) DEFAULT NULL,
  `others` varchar(191) DEFAULT NULL,
  `sister_ticket_id` int(11) DEFAULT NULL,
  `escalated_by` int(11) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `tickets`
--

INSERT INTO `tickets` (`id`, `description`, `asset_tag`, `details`, `user_id`, `created_by`, `status_id`, `assigned_to`, `created_at`, `updated_at`, `issue_id`, `talent_group_id`, `others`, `sister_ticket_id`, `escalated_by`) VALUES
(1, 'Ac not working', 'tag123', '[{\"user\":\"admin admin\",\"date\":\"2021-07-05T06:26:26.992Z\"},{\"user\":\"Divya S\",\"detail\":\"Inprogress\",\"status\":\"Inprogress\",\"date\":\"2021-07-05T06:38:54.081Z\"},{\"user\":\"Divya S\",\"date\":\"2021-07-05T07:10:46.847Z\",\"status\":\"Close\"},{\"user\":\"Divya S\",\"detail\":\"Inprogress\",\"status\":\"Inprogress\",\"date\":\"2021-07-06T06:07:57.169Z\"},{\"user\":\"Divya S\",\"detail\":\"Inprogress\",\"status\":\"Inprogress\",\"date\":\"2021-07-06T06:30:23.217Z\"},{\"user\":\"Divya S\",\"detail\":\"Inprogress\",\"status\":\"Inprogress\",\"date\":\"2021-07-06T06:31:48.899Z\"},{\"user\":\"Divya S\",\"detail\":\"Inprogress\",\"status\":\"Inprogress\",\"date\":\"2021-07-06T06:31:53.829Z\"},{\"user\":\"Divya S\",\"detail\":\"Inprogress\",\"status\":\"Inprogress\",\"date\":\"2021-07-06T06:35:34.000Z\"},{\"user\":\"Divya S\",\"detail\":\"Inprogress\",\"status\":\"Inprogress\",\"date\":\"2021-07-06T06:36:51.611Z\"},{\"user\":\"Divya S\",\"detail\":\"Inprogress\",\"status\":\"Inprogress\",\"date\":\"2021-07-06T09:02:29.952Z\"},{\"user\":\"Renisha L\",\"detail\":\"Inprogress\",\"status\":\"Inprogress\",\"date\":\"2021-07-07T07:09:20.067Z\"},{\"user\":\"Renisha L\",\"detail\":\"Inprogress\",\"status\":\"Inprogress\",\"date\":\"2021-07-07T07:14:26.867Z\"},{\"user\":\"Renisha L\",\"detail\":\"Inprogress\",\"status\":\"Inprogress\",\"date\":\"2021-07-07T07:16:06.565Z\"},{\"user\":\"Renisha L\",\"detail\":\"Inprogress\",\"status\":\"Inprogress\",\"date\":\"2021-07-07T07:16:51.450Z\"},{\"user\":\"Renisha L\",\"detail\":\"Inprogress\",\"status\":\"Inprogress\",\"date\":\"2021-07-07T07:20:54.246Z\"},{\"user\":\"Renisha L\",\"detail\":\"Inprogress\",\"status\":\"Inprogress\",\"date\":\"2021-07-07T07:22:14.668Z\"},{\"user\":\"Renisha L\",\"date\":\"2021-07-07T07:31:46.542Z\",\"status\":\"Close\"},{\"user\":\"Renisha L\",\"detail\":\"Inprogress\",\"status\":\"Inprogress\",\"date\":\"2021-07-07T11:08:59.865Z\"},{\"user\":\"Renisha L\",\"date\":\"2021-07-07T11:11:26.588Z\",\"status\":\"Close\"},{\"user\":\"Renisha L\",\"detail\":\"Inprogress\",\"status\":\"Inprogress\",\"date\":\"2021-07-08T05:02:37.209Z\"}]', 55, 44, 6, 55, '2021-07-05 06:26:26', '2021-07-12 07:20:32', 9, 1, NULL, 1, 0),
(2, 'desc ', 'tag123', '[{\"user\":\"admin admin\",\"date\":\"2021-07-05T06:27:06.561Z\"},{\"user\":\"Deepak D\",\"detail\":\"Inprogress\",\"status\":\"Inprogress\",\"date\":\"2021-07-07T05:20:36.506Z\"},{\"user\":\"Deepak D\",\"detail\":\"Inprogress\",\"status\":\"Inprogress\",\"date\":\"2021-07-14T06:06:46.994Z\"},{\"user\":\"Deepak D\",\"detail\":\"closed\",\"date\":\"2021-07-14T06:28:28.103Z\",\"status\":\"Close\"}]', 57, 44, 3, 57, '2021-07-05 06:27:06', '2021-07-14 06:28:28', 7, 3, NULL, NULL, 0),
(3, 'hgbdjb', 'HP9090', '[{\"user\":\"admin admin\",\"date\":\"2021-07-05T06:26:26.992Z\"},{\"user\":\"Divya S\",\"detail\":\"Inprogress\",\"status\":\"Inprogress\",\"date\":\"2021-07-05T06:38:54.081Z\"},{\"user\":\"Divya S\",\"date\":\"2021-07-05T07:10:46.847Z\",\"status\":\"Close\"},{\"user\":\"Divya S\",\"detail\":\"Inprogress\",\"status\":\"Inprogress\",\"date\":\"2021-07-06T06:07:57.169Z\"},{\"user\":\"Divya S\",\"detail\":\"Inprogress\",\"status\":\"Inprogress\",\"date\":\"2021-07-06T06:30:23.217Z\"},{\"user\":\"Divya S\",\"detail\":\"Inprogress\",\"status\":\"Inprogress\",\"date\":\"2021-07-06T06:31:48.899Z\"},{\"user\":\"Divya S\",\"detail\":\"Inprogress\",\"status\":\"Inprogress\",\"date\":\"2021-07-06T06:31:53.829Z\"},{\"user\":\"Divya S\",\"detail\":\"Inprogress\",\"status\":\"Inprogress\",\"date\":\"2021-07-06T06:35:34.000Z\"},{\"user\":\"Divya S\",\"detail\":\"Inprogress\",\"status\":\"Inprogress\",\"date\":\"2021-07-06T06:36:51.611Z\"},{\"user\":\"Divya S\",\"detail\":\"Inprogress\",\"status\":\"Inprogress\",\"date\":\"2021-07-06T09:02:29.952Z\"},{\"user\":\"Renisha L\",\"detail\":\"Inprogress\",\"status\":\"Inprogress\",\"date\":\"2021-07-07T07:09:20.067Z\"},{\"user\":\"Renisha L\",\"detail\":\"Inprogress\",\"status\":\"Inprogress\",\"date\":\"2021-07-07T07:14:26.867Z\"},{\"user\":\"Renisha L\",\"detail\":\"Inprogress\",\"status\":\"Inprogress\",\"date\":\"2021-07-07T07:16:06.565Z\"},{\"user\":\"Renisha L\",\"detail\":\"Inprogress\",\"status\":\"Inprogress\",\"date\":\"2021-07-07T07:16:51.450Z\"},{\"user\":\"Renisha L\",\"detail\":\"Inprogress\",\"status\":\"Inprogress\",\"date\":\"2021-07-07T07:20:54.246Z\"},{\"user\":\"Renisha L\",\"detail\":\"Inprogress\",\"status\":\"Inprogress\",\"date\":\"2021-07-07T07:22:14.668Z\"},{\"user\":\"Renisha L\",\"date\":\"2021-07-07T07:31:46.544Z\"},{\"user\":\"Renisha L\",\"detail\":\"Inprogress\",\"status\":\"Inprogress\",\"date\":\"2021-07-07T11:08:59.885Z\"},{\"user\":\"Renisha L\",\"detail\":\"Inprogress\",\"status\":\"Inprogress\",\"date\":\"2021-07-08T05:02:37.224Z\"},{\"user\":\"Renisha L\",\"date\":\"2021-07-12T07:07:16.816Z\",\"status\":\"Escalate\"}]', 55, 44, 4, 56, '2021-07-05 06:27:28', '2021-07-12 07:07:16', 8, 1, NULL, NULL, 55),
(4, 'desc ', 'tag123', '[{\"user\":\"admin admin\",\"date\":\"2021-07-05T06:27:28.385Z\"},{\"user\":\"Renisha L\",\"detail\":\"Inprogress\",\"status\":\"Inprogress\",\"date\":\"2021-07-05T06:49:55.699Z\"},{\"user\":\"Renisha L\",\"detail\":\"Inprogress\",\"status\":\"Inprogress\",\"date\":\"2021-07-06T09:11:23.652Z\"},{\"user\":\"Renisha L\",\"detail\":\"Inprogress\",\"status\":\"Inprogress\",\"date\":\"2021-07-07T04:59:29.155Z\"},{\"user\":\"Renisha L\",\"detail\":\"Inprogress\",\"status\":\"Inprogress\",\"date\":\"2021-07-07T06:21:28.675Z\"},{\"user\":\"Renisha L\",\"detail\":\"Inprogress\",\"status\":\"Inprogress\",\"date\":\"2021-07-07T06:22:11.050Z\"},{\"user\":\"Renisha L\",\"detail\":\"Inprogress\",\"status\":\"Inprogress\",\"date\":\"2021-07-07T06:52:04.824Z\"},{\"user\":\"Renisha L\",\"date\":\"2021-07-07T06:54:37.940Z\"},{\"user\":\"Renisha L\",\"detail\":\"Inprogress\",\"status\":\"Inprogress\",\"date\":\"2021-07-07T06:57:50.090Z\"},{\"user\":\"Renisha L\",\"detail\":\"Inprogress\",\"status\":\"Inprogress\",\"date\":\"2021-07-07T06:59:04.147Z\"},{\"user\":\"Divya S\",\"detail\":\"Inprogress\",\"status\":\"Inprogress\",\"date\":\"2021-07-07T07:34:45.107Z\"}]', 54, 44, 2, 54, '2021-07-05 06:27:44', '2021-07-07 07:34:45', 8, 1, NULL, NULL, 0),
(5, 'ac not working', '72345689', '[{\"user\":\"admin admin\",\"date\":\"2021-07-05T06:26:26.992Z\"},{\"user\":\"Divya S\",\"detail\":\"Inprogress\",\"status\":\"Inprogress\",\"date\":\"2021-07-05T06:38:54.081Z\"},{\"user\":\"Divya S\",\"date\":\"2021-07-05T07:10:46.847Z\",\"status\":\"Close\"},{\"user\":\"Divya S\",\"detail\":\"Inprogress\",\"status\":\"Inprogress\",\"date\":\"2021-07-06T06:07:57.169Z\"},{\"user\":\"Divya S\",\"detail\":\"Inprogress\",\"status\":\"Inprogress\",\"date\":\"2021-07-06T06:30:23.217Z\"},{\"user\":\"Divya S\",\"detail\":\"Inprogress\",\"status\":\"Inprogress\",\"date\":\"2021-07-06T06:31:48.899Z\"},{\"user\":\"Divya S\",\"detail\":\"Inprogress\",\"status\":\"Inprogress\",\"date\":\"2021-07-06T06:31:53.829Z\"},{\"user\":\"Divya S\",\"detail\":\"Inprogress\",\"status\":\"Inprogress\",\"date\":\"2021-07-06T06:35:34.000Z\"},{\"user\":\"Divya S\",\"detail\":\"Inprogress\",\"status\":\"Inprogress\",\"date\":\"2021-07-06T06:36:51.611Z\"},{\"user\":\"Divya S\",\"detail\":\"Inprogress\",\"status\":\"Inprogress\",\"date\":\"2021-07-06T09:02:29.952Z\"},{\"user\":\"Renisha L\",\"detail\":\"Inprogress\",\"status\":\"Inprogress\",\"date\":\"2021-07-07T07:09:20.067Z\"},{\"user\":\"Renisha L\",\"detail\":\"Inprogress\",\"status\":\"Inprogress\",\"date\":\"2021-07-07T07:14:26.867Z\"},{\"user\":\"Renisha L\",\"detail\":\"Inprogress\",\"status\":\"Inprogress\",\"date\":\"2021-07-07T07:16:06.565Z\"},{\"user\":\"Renisha L\",\"detail\":\"Inprogress\",\"status\":\"Inprogress\",\"date\":\"2021-07-07T07:16:51.450Z\"},{\"user\":\"Renisha L\",\"detail\":\"Inprogress\",\"status\":\"Inprogress\",\"date\":\"2021-07-07T07:20:54.246Z\"},{\"user\":\"Renisha L\",\"detail\":\"Inprogress\",\"status\":\"Inprogress\",\"date\":\"2021-07-07T07:22:14.668Z\"},{\"user\":\"Renisha L\",\"date\":\"2021-07-07T07:31:46.542Z\",\"status\":\"Close\"},{\"user\":\"Renisha L\",\"detail\":\"Inprogress\",\"status\":\"Inprogress\",\"date\":\"2021-07-07T11:08:59.865Z\"},{\"user\":\"Renisha L\",\"date\":\"2021-07-07T11:11:26.590Z\"},{\"user\":\"Renisha L\",\"detail\":\"Inprogress\",\"status\":\"Inprogress\",\"date\":\"2021-07-08T05:02:37.232Z\"}]', 56, 44, 6, 55, '2021-07-06 09:06:46', '2021-07-09 11:55:55', 9, 1, NULL, 5, 0),
(6, 'reassign', '72345689', '[{\"user\":\"admin admin\",\"date\":\"2021-07-05T06:26:26.992Z\"},{\"user\":\"Divya S\",\"detail\":\"Inprogress\",\"status\":\"Inprogress\",\"date\":\"2021-07-05T06:38:54.081Z\"},{\"user\":\"Divya S\",\"date\":\"2021-07-05T07:10:46.847Z\",\"status\":\"Close\"},{\"user\":\"Divya S\",\"detail\":\"Inprogress\",\"status\":\"Inprogress\",\"date\":\"2021-07-06T06:07:57.169Z\"},{\"user\":\"Divya S\",\"detail\":\"Inprogress\",\"status\":\"Inprogress\",\"date\":\"2021-07-06T06:30:23.217Z\"},{\"user\":\"Divya S\",\"detail\":\"Inprogress\",\"status\":\"Inprogress\",\"date\":\"2021-07-06T06:31:48.899Z\"},{\"user\":\"Divya S\",\"detail\":\"Inprogress\",\"status\":\"Inprogress\",\"date\":\"2021-07-06T06:31:53.829Z\"},{\"user\":\"Divya S\",\"detail\":\"Inprogress\",\"status\":\"Inprogress\",\"date\":\"2021-07-06T06:35:34.000Z\"},{\"user\":\"Divya S\",\"detail\":\"Inprogress\",\"status\":\"Inprogress\",\"date\":\"2021-07-06T06:36:51.611Z\"},{\"user\":\"Divya S\",\"detail\":\"Inprogress\",\"status\":\"Inprogress\",\"date\":\"2021-07-06T09:02:29.952Z\"},{\"user\":\"Renisha L\",\"detail\":\"Inprogress\",\"status\":\"Inprogress\",\"date\":\"2021-07-07T07:09:20.067Z\"},{\"user\":\"Renisha L\",\"detail\":\"Inprogress\",\"status\":\"Inprogress\",\"date\":\"2021-07-07T07:14:26.867Z\"},{\"user\":\"Renisha L\",\"detail\":\"Inprogress\",\"status\":\"Inprogress\",\"date\":\"2021-07-07T07:16:06.565Z\"},{\"user\":\"Renisha L\",\"detail\":\"Inprogress\",\"status\":\"Inprogress\",\"date\":\"2021-07-07T07:16:51.450Z\"},{\"user\":\"Renisha L\",\"detail\":\"Inprogress\",\"status\":\"Inprogress\",\"date\":\"2021-07-07T07:20:54.246Z\"},{\"user\":\"Renisha L\",\"detail\":\"Inprogress\",\"status\":\"Inprogress\",\"date\":\"2021-07-07T07:22:14.668Z\"},{\"user\":\"Renisha L\",\"date\":\"2021-07-07T07:31:46.544Z\"},{\"user\":\"Renisha L\",\"detail\":\"Inprogress\",\"status\":\"Inprogress\",\"date\":\"2021-07-07T11:08:59.885Z\"},{\"user\":\"Renisha L\",\"detail\":\"Inprogress\",\"status\":\"Inprogress\",\"date\":\"2021-07-08T05:02:37.224Z\"},{\"user\":\"Renisha L\",\"date\":\"2021-07-12T07:07:16.821Z\"},{\"user\":\"Renisha L\",\"date\":\"2021-07-12T07:08:26.146Z\",\"status\":\"Escalate\"},{\"user\":\"Regila Albert\",\"detail\":\"nn\",\"date\":\"2021-07-12T07:12:24.039Z\",\"status\":\"Reassign\"},{\"user\":\"Divya S\",\"detail\":\"nn\",\"date\":\"2021-07-12T07:14:52.771Z\",\"status\":\"Close\"}]', 54, 56, 3, 54, '2021-07-09 11:55:55', '2021-07-12 07:14:52', 9, 1, NULL, NULL, 55),
(7, 'test', 'tag123', '[{\"user\":\"Renisha L\",\"date\":\"2021-07-12T07:20:32.832Z\"},{\"user\":\"Divya S\",\"detail\":\"nnn\",\"date\":\"2021-07-12T09:48:45.110Z\",\"status\":\"Escalate\"}]', 56, 55, 6, 56, '2021-07-12 07:20:32', '2021-07-14 06:05:46', 9, 1, NULL, 7, 54),
(8, 'test ', 'tag123', '[{\"user\":\"admin admin\",\"date\":\"2021-07-05T06:27:06.561Z\"},{\"user\":\"Deepak D\",\"detail\":\"Inprogress\",\"status\":\"Inprogress\",\"date\":\"2021-07-07T05:20:36.506Z\"},{\"user\":\"Deepak D\",\"detail\":\"Inprogress\",\"status\":\"Inprogress\",\"date\":\"2021-07-14T06:06:46.994Z\"},{\"user\":\"Deepak D\",\"detail\":\"closed\",\"date\":\"2021-07-14T06:28:28.107Z\"}]', 57, 56, 2, 57, '2021-07-12 09:50:03', '2021-07-14 06:28:28', 7, 3, NULL, NULL, 0),
(9, 'keybosrd not working', 'tag123', '[{\"user\":\"Regila Albert\",\"date\":\"2021-07-14T06:04:44.098Z\"}]', 56, 56, 1, NULL, '2021-07-14 06:04:44', '2021-07-14 06:04:44', 7, 3, NULL, NULL, 0),
(10, 'keybosrd not working', 'tag123', '[{\"user\":\"Regila Albert\",\"date\":\"2021-07-14T06:05:46.943Z\"}]', 56, 56, 1, NULL, '2021-07-14 06:05:46', '2021-07-14 06:05:46', 7, 3, NULL, NULL, 0),
(11, 'nnn', '125757956	', '[{\"user\":\"admin admin\",\"date\":\"2021-07-14T11:53:21.740Z\"}]', 44, 44, 2, 54, '2021-07-14 11:53:21', '2021-07-14 11:53:21', 10, 1, NULL, NULL, 0),
(12, 'test', '72345689', '[{\"user\":\"Renisha L\",\"date\":\"2021-07-14T11:54:32.858Z\"},{\"user\":\"Renisha L\",\"detail\":\"closed\",\"date\":\"2021-07-14T11:56:59.141Z\",\"status\":\"Close\"}]', 55, 55, 3, 55, '2021-07-14 11:54:32', '2021-07-14 11:56:59', 9, 1, NULL, NULL, 0),
(13, 'nnn', '72345689', '[{\"user\":\"Renisha L\",\"date\":\"2021-07-14T11:54:32.858Z\"},{\"user\":\"Renisha L\",\"detail\":\"closed\",\"date\":\"2021-07-14T11:56:59.146Z\"},{\"user\":\"Regila Albert\",\"date\":\"2021-07-19T11:33:59.806Z\",\"status\":\"Reassign\"},{\"user\":\"Regila Albert\",\"detail\":\"reassigned\",\"date\":\"2021-07-19T11:36:50.187Z\",\"status\":\"Reassign\"}]', 56, 55, 2, 54, '2021-07-14 11:55:28', '2021-07-19 11:36:50', 8, 1, NULL, NULL, 0),
(14, 'test', '72345689', '[{\"user\":\"Renisha L\",\"date\":\"2021-07-14T11:57:27.772Z\"}]', 55, 55, 1, NULL, '2021-07-14 11:57:27', '2021-07-14 11:57:27', 7, 3, NULL, NULL, 0),
(15, 'test', '72345689', '[{\"user\":\"admin admin\",\"date\":\"2021-07-15T10:33:41.951Z\"}]', 44, 44, 1, NULL, '2021-07-15 10:33:41', '2021-07-15 10:33:41', 9, 1, NULL, NULL, 0),
(16, 'yyy', '72345689', '[{\"user\":\"admin admin\",\"date\":\"2021-07-15T10:35:41.183Z\"}]', 44, 44, 1, NULL, '2021-07-15 10:35:41', '2021-07-15 10:35:41', 8, 1, NULL, NULL, 0),
(17, 'nnn', '72345689', '[{\"user\":\"admin admin\",\"date\":\"2021-07-22T10:41:35.625Z\"}]', 44, 44, 1, NULL, '2021-07-22 10:41:35', '2021-07-22 10:41:35', 9, 1, NULL, NULL, 0),
(18, 'mm', '72345689', '[{\"user\":\"Divya S\",\"date\":\"2021-07-22T15:44:45.078Z\"}]', 54, 54, 1, NULL, '2021-07-22 15:44:45', '2021-07-22 15:44:45', 9, 1, NULL, NULL, 0),
(19, 'bb', '72345689', '[{\"user\":\"Regila Albert\",\"date\":\"2021-07-23T04:36:01.347Z\"}]', 56, 56, 1, NULL, '2021-07-23 04:36:01', '2021-07-23 04:36:01', 9, 1, NULL, NULL, 0);

-- --------------------------------------------------------

--
-- Table structure for table `ticket_issues`
--

CREATE TABLE `ticket_issues` (
  `id` int(10) NOT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` varchar(500) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `talent_group_id` int(10) DEFAULT NULL,
  `severity_id` int(10) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `skill_level_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `ticket_issues`
--

INSERT INTO `ticket_issues` (`id`, `name`, `description`, `talent_group_id`, `severity_id`, `created_at`, `updated_at`, `user_id`, `deleted_at`, `skill_level_id`) VALUES
(1, 'Ticket Issues1', 'Desc 1', 1, NULL, '2021-05-28 15:54:57', '2021-07-02 18:55:46', 44, '2021-07-02 18:55:46', NULL),
(2, 'electrician', 'bjadhj', 1, NULL, '2021-06-02 11:02:51', '2021-07-02 18:55:43', 44, '2021-07-02 18:55:43', NULL),
(3, 'test t g', 'test des', 4, NULL, '2021-06-02 11:04:45', '2021-06-05 07:31:56', 44, NULL, NULL),
(4, 'water leakage', 'desc', 2, NULL, '2021-07-02 18:56:42', '2021-07-02 18:56:42', 44, NULL, NULL),
(5, 'water heater problems', 'desc', 2, NULL, '2021-07-02 18:57:49', '2021-07-02 18:57:49', 44, NULL, NULL),
(6, 'Mouse not working', 'desc', 3, NULL, '2021-07-02 18:58:16', '2021-07-02 18:58:16', 44, NULL, NULL),
(7, 'keyboard not working', 'desc', 3, NULL, '2021-07-02 19:01:03', '2021-07-02 19:01:03', 44, NULL, NULL),
(8, 'fan not working', 'fan not working', 1, NULL, '2021-07-05 06:24:36', '2021-07-05 06:24:36', 44, NULL, NULL),
(9, 'Ac not working', 'AC not working', 1, NULL, '2021-07-05 06:24:58', '2021-07-05 06:24:58', 44, NULL, NULL),
(10, 'damaged power lines', 'damaged power lines', 1, NULL, '2021-07-05 06:35:08', '2021-07-05 06:35:08', 44, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `ticket_status`
--

CREATE TABLE `ticket_status` (
  `id` int(11) NOT NULL,
  `name` varchar(191) NOT NULL,
  `type` varchar(191) NOT NULL,
  `user_id` int(11) NOT NULL,
  `created_by` int(11) NOT NULL,
  `created_at` datetime NOT NULL,
  `deleted_at` datetime NOT NULL,
  `updated_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `ticket_status`
--

INSERT INTO `ticket_status` (`id`, `name`, `type`, `user_id`, `created_by`, `created_at`, `deleted_at`, `updated_at`) VALUES
(1, 'Open', '0', 0, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00', NULL),
(2, 'Inprogress', '0', 0, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00', NULL),
(3, 'Close', '1', 0, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00', NULL),
(4, 'Escalate', '1', 0, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00', NULL),
(5, 'Hold', '0', 0, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00', NULL),
(6, 'Sister Ticket', '1', 0, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00', NULL),
(7, 'Reassign', '2', 0, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(10) UNSIGNED NOT NULL,
  `email` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `password` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `permissions` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `activated` tinyint(1) NOT NULL DEFAULT 0,
  `activation_code` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `activated_at` timestamp NULL DEFAULT NULL,
  `last_login` timestamp NULL DEFAULT NULL,
  `persist_code` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `reset_password_code` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `first_name` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `last_name` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `website` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `country` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `gravatar` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `location_id` int(11) DEFAULT NULL,
  `phone` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `jobtitle` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `manager_id` int(11) DEFAULT NULL,
  `employee_num` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `avatar` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `username` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `notes` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `company_id` int(10) UNSIGNED DEFAULT NULL,
  `remember_token` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `ldap_import` tinyint(1) NOT NULL DEFAULT 0,
  `locale` varchar(10) COLLATE utf8mb4_unicode_ci DEFAULT 'en',
  `show_in_list` tinyint(1) NOT NULL DEFAULT 1,
  `two_factor_secret` varchar(32) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `two_factor_enrolled` tinyint(1) NOT NULL DEFAULT 0,
  `two_factor_optin` tinyint(1) NOT NULL DEFAULT 0,
  `department_id` int(11) DEFAULT NULL,
  `address` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `city` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `state` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `zip` varchar(10) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `skill_level_id` int(11) DEFAULT NULL,
  `talent_group_id` int(11) DEFAULT NULL,
  `availability_status` int(11) DEFAULT NULL,
  `user_type` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `email`, `password`, `permissions`, `activated`, `activation_code`, `activated_at`, `last_login`, `persist_code`, `reset_password_code`, `first_name`, `last_name`, `created_at`, `updated_at`, `deleted_at`, `website`, `country`, `gravatar`, `location_id`, `phone`, `jobtitle`, `manager_id`, `employee_num`, `avatar`, `username`, `notes`, `company_id`, `remember_token`, `ldap_import`, `locale`, `show_in_list`, `two_factor_secret`, `two_factor_enrolled`, `two_factor_optin`, `department_id`, `address`, `city`, `state`, `zip`, `skill_level_id`, `talent_group_id`, `availability_status`, `user_type`) VALUES
(44, 'ss@ss.com', '$2b$10$Vf/G4q94QnlGgIltwgwWi.9iyjbbrgchLzOlNCIGiXC0A8SXl6Tnu', NULL, 1, NULL, NULL, NULL, NULL, NULL, 'admin', 'admin', '2021-05-05 05:08:29', '2021-06-29 06:56:10', NULL, 'ss@ss.com', 'AFG', NULL, NULL, '123456', 'rg', 39, '1324', NULL, 'admin', 'ds', 51, NULL, 0, 'en', 1, NULL, 0, 0, 6, 'sup ad', 'chennai', 'tn', '621322', NULL, NULL, 2, NULL),
(54, 'divya@gmail.com', '$2a$10$d4T4SQBHUw1J9D1fI7.MZOXbnAHpGB1qfw9.s8DnTt02qc/QDB2zG', NULL, 1, NULL, NULL, NULL, NULL, NULL, 'Divya', 'S', '2021-07-05 06:07:50', '2021-07-19 11:36:50', NULL, 'www.regila.com', 'HUN', NULL, NULL, '567252376', 'HR', 44, '1', NULL, 'divya', 'nill', 1, NULL, 0, 'en', 1, NULL, 0, 0, NULL, 'Kovil Vilagam,Eraviputhenthurai', 'Tamil Nadu', 'Tamil Nadu', '629176', NULL, 1, 3, 1),
(55, 'renisha@f.com', '$2a$10$cGMsfYlFlfExvwVVXqksyutDhpya/xfeO04Bn07DAB4SMmtCozNFi', NULL, 1, NULL, NULL, NULL, NULL, NULL, 'Renisha', 'L', '2021-07-05 06:09:13', '2021-07-14 11:56:59', NULL, 'www.regila.com', 'DZA', NULL, NULL, '567252376', 'Engineer', 44, '1', NULL, 'renisha', 'b', 1, NULL, 0, 'en', 1, NULL, 0, 0, NULL, 'Kovil Vilagam,Eraviputhenthurai', 'Tamil Nadu', 'Tamil Nadu', '629176', NULL, 1, 3, 1),
(56, 'regila@gmail.com', '$2a$10$d4T4SQBHUw1J9D1fI7.MZOXbnAHpGB1qfw9.s8DnTt02qc/QDB2zG', NULL, 1, NULL, NULL, NULL, NULL, NULL, 'Regila', 'Albert', '2021-07-05 06:10:17', '2021-07-05 06:10:17', NULL, 'www.regila.com', 'ALB', NULL, NULL, '567252376', 'HR', 44, '1', NULL, 'regila', 'nill', 1, NULL, 0, 'en', 1, NULL, 0, 0, NULL, 'Kovil Vilagam,Eraviputhenthurai', 'Tamil Nadu', 'Tamil Nadu', '629176', NULL, 1, 2, 2),
(57, 'deepak@gmail.com', '$2a$10$d4T4SQBHUw1J9D1fI7.MZOXbnAHpGB1qfw9.s8DnTt02qc/QDB2zG', NULL, 1, NULL, NULL, NULL, NULL, NULL, 'Deepak', 'D', '2021-07-05 06:12:43', '2021-07-14 06:28:28', NULL, 'https://ghghg.vkm', 'ASM', NULL, NULL, '567252376', 'HR', 44, '1', NULL, 'deepak', 'fcsdf', 2, NULL, 0, 'en', 1, NULL, 0, 0, NULL, 'Kovil Vilagam,Eraviputhenthurai', 'Tamil Nadu', 'Tamil Nadu', '629176', NULL, 3, 3, 1),
(58, 'dinchu@gmail.com', '$2a$10$qDvDYnwA2S4Y1k/GwtfXH.yapmFr5j0xGV/paHv1XPHfacFcMn7U6', NULL, 1, NULL, NULL, NULL, NULL, NULL, 'dinchu', 'dinchu', '2021-07-15 13:07:30', '2021-07-15 13:07:30', NULL, 'www.dinchu.com', 'DZA', NULL, 1, '9865545345', 'test title', 54, '789665', NULL, 'dinchu', 'nnn', 1, NULL, 0, 'en', 1, NULL, 0, 0, 1, 'chennai', 'chennai', 'tn', '675', NULL, NULL, NULL, NULL),
(59, 'jjjjjj@gmail.com', '$2a$10$SQFJw0vT37NR0F6SAyi.Ke1iqVdtW8nb./tKiSWgHUTyEl.G7gH62', NULL, 1, NULL, NULL, NULL, NULL, NULL, 'diya', 'diya', '2021-07-29 15:02:27', '2021-07-29 15:02:27', NULL, 'www.Anabelle.com', 'BHS', NULL, 16, '09865545345', 'test title', 44, '789665', NULL, 'diya', 'nnnn', 5, NULL, 0, 'en', 1, NULL, 0, 0, 2, 'chennai', 'chennai', 'tn', '675', NULL, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `users_groups`
--

CREATE TABLE `users_groups` (
  `user_id` int(10) UNSIGNED NOT NULL,
  `group_id` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users_groups`
--

INSERT INTO `users_groups` (`user_id`, `group_id`) VALUES
(44, 1),
(50, 1),
(51, 4),
(52, 1),
(53, 1),
(54, 1),
(55, 1),
(56, 1),
(57, 1),
(58, 1),
(59, 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `accessories`
--
ALTER TABLE `accessories`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `accessories_users`
--
ALTER TABLE `accessories_users`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `action_logs`
--
ALTER TABLE `action_logs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `action_logs_thread_id_index` (`thread_id`),
  ADD KEY `action_logs_target_id_target_type_index` (`target_id`,`target_type`),
  ADD KEY `action_logs_created_at_index` (`created_at`),
  ADD KEY `action_logs_item_type_item_id_action_type_index` (`item_type`,`item_id`,`action_type`),
  ADD KEY `action_logs_target_type_target_id_action_type_index` (`target_type`,`target_id`,`action_type`);

--
-- Indexes for table `assets`
--
ALTER TABLE `assets`
  ADD PRIMARY KEY (`id`),
  ADD KEY `assets_rtd_location_id_index` (`rtd_location_id`),
  ADD KEY `assets_assigned_type_assigned_to_index` (`assigned_type`,`assigned_to`),
  ADD KEY `assets_created_at_index` (`created_at`),
  ADD KEY `assets_deleted_at_status_id_index` (`deleted_at`,`status_id`),
  ADD KEY `assets_deleted_at_model_id_index` (`deleted_at`,`model_id`),
  ADD KEY `assets_deleted_at_assigned_type_assigned_to_index` (`deleted_at`,`assigned_type`,`assigned_to`),
  ADD KEY `assets_deleted_at_supplier_id_index` (`deleted_at`,`supplier_id`),
  ADD KEY `assets_deleted_at_location_id_index` (`deleted_at`,`location_id`),
  ADD KEY `assets_deleted_at_rtd_location_id_index` (`deleted_at`,`rtd_location_id`),
  ADD KEY `assets_deleted_at_asset_tag_index` (`deleted_at`,`asset_tag`),
  ADD KEY `assets_deleted_at_name_index` (`deleted_at`,`name`);

--
-- Indexes for table `asset_logs`
--
ALTER TABLE `asset_logs`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `asset_maintenances`
--
ALTER TABLE `asset_maintenances`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `asset_uploads`
--
ALTER TABLE `asset_uploads`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `checkout_acceptances`
--
ALTER TABLE `checkout_acceptances`
  ADD PRIMARY KEY (`id`),
  ADD KEY `checkout_acceptances_checkoutable_type_checkoutable_id_index` (`checkoutable_type`,`checkoutable_id`);

--
-- Indexes for table `checkout_requests`
--
ALTER TABLE `checkout_requests`
  ADD PRIMARY KEY (`id`),
  ADD KEY `checkout_requests_user_id_requestable_id_requestable_type` (`user_id`,`requestable_id`,`requestable_type`);

--
-- Indexes for table `companies`
--
ALTER TABLE `companies`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `companies_name_unique` (`name`);

--
-- Indexes for table `components`
--
ALTER TABLE `components`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `components_assets`
--
ALTER TABLE `components_assets`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `consumables`
--
ALTER TABLE `consumables`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `consumables_users`
--
ALTER TABLE `consumables_users`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `custom_fields`
--
ALTER TABLE `custom_fields`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `custom_fieldsets`
--
ALTER TABLE `custom_fieldsets`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `departments`
--
ALTER TABLE `departments`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `depreciations`
--
ALTER TABLE `depreciations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `firm_logo`
--
ALTER TABLE `firm_logo`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `imports`
--
ALTER TABLE `imports`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `kits`
--
ALTER TABLE `kits`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `kits_accessories`
--
ALTER TABLE `kits_accessories`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `kits_consumables`
--
ALTER TABLE `kits_consumables`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `kits_licenses`
--
ALTER TABLE `kits_licenses`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `kits_models`
--
ALTER TABLE `kits_models`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `licenses`
--
ALTER TABLE `licenses`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `license_seats`
--
ALTER TABLE `license_seats`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `locations`
--
ALTER TABLE `locations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `login_attempts`
--
ALTER TABLE `login_attempts`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `manufacturers`
--
ALTER TABLE `manufacturers`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `models`
--
ALTER TABLE `models`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `models_custom_fields`
--
ALTER TABLE `models_custom_fields`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `oauth_access_tokens`
--
ALTER TABLE `oauth_access_tokens`
  ADD PRIMARY KEY (`id`),
  ADD KEY `oauth_access_tokens_user_id_index` (`user_id`);

--
-- Indexes for table `oauth_auth_codes`
--
ALTER TABLE `oauth_auth_codes`
  ADD PRIMARY KEY (`id`),
  ADD KEY `oauth_auth_codes_user_id_index` (`user_id`);

--
-- Indexes for table `oauth_clients`
--
ALTER TABLE `oauth_clients`
  ADD PRIMARY KEY (`id`),
  ADD KEY `oauth_clients_user_id_index` (`user_id`);

--
-- Indexes for table `oauth_personal_access_clients`
--
ALTER TABLE `oauth_personal_access_clients`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `oauth_refresh_tokens`
--
ALTER TABLE `oauth_refresh_tokens`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `password_resets`
--
ALTER TABLE `password_resets`
  ADD KEY `password_resets_email_index` (`email`),
  ADD KEY `password_resets_token_index` (`token`);

--
-- Indexes for table `permission_groups`
--
ALTER TABLE `permission_groups`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `requested_assets`
--
ALTER TABLE `requested_assets`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `requests`
--
ALTER TABLE `requests`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `settings`
--
ALTER TABLE `settings`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `severity`
--
ALTER TABLE `severity`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `skill_level`
--
ALTER TABLE `skill_level`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `status_labels`
--
ALTER TABLE `status_labels`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `suppliers`
--
ALTER TABLE `suppliers`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `talent_groups`
--
ALTER TABLE `talent_groups`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `throttle`
--
ALTER TABLE `throttle`
  ADD PRIMARY KEY (`id`),
  ADD KEY `throttle_user_id_index` (`user_id`);

--
-- Indexes for table `tickets`
--
ALTER TABLE `tickets`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `ticket_issues`
--
ALTER TABLE `ticket_issues`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `ticket_status`
--
ALTER TABLE `ticket_status`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD KEY `users_activation_code_index` (`activation_code`),
  ADD KEY `users_reset_password_code_index` (`reset_password_code`);

--
-- Indexes for table `users_groups`
--
ALTER TABLE `users_groups`
  ADD PRIMARY KEY (`user_id`,`group_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `accessories`
--
ALTER TABLE `accessories`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `accessories_users`
--
ALTER TABLE `accessories_users`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `action_logs`
--
ALTER TABLE `action_logs`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT for table `assets`
--
ALTER TABLE `assets`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `asset_logs`
--
ALTER TABLE `asset_logs`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `asset_maintenances`
--
ALTER TABLE `asset_maintenances`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `asset_uploads`
--
ALTER TABLE `asset_uploads`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `categories`
--
ALTER TABLE `categories`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT for table `checkout_acceptances`
--
ALTER TABLE `checkout_acceptances`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `checkout_requests`
--
ALTER TABLE `checkout_requests`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `companies`
--
ALTER TABLE `companies`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `components`
--
ALTER TABLE `components`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `components_assets`
--
ALTER TABLE `components_assets`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `consumables`
--
ALTER TABLE `consumables`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `consumables_users`
--
ALTER TABLE `consumables_users`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `custom_fields`
--
ALTER TABLE `custom_fields`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `custom_fieldsets`
--
ALTER TABLE `custom_fieldsets`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `departments`
--
ALTER TABLE `departments`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `depreciations`
--
ALTER TABLE `depreciations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `firm_logo`
--
ALTER TABLE `firm_logo`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `imports`
--
ALTER TABLE `imports`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `kits`
--
ALTER TABLE `kits`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `kits_accessories`
--
ALTER TABLE `kits_accessories`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `kits_consumables`
--
ALTER TABLE `kits_consumables`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `kits_licenses`
--
ALTER TABLE `kits_licenses`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `kits_models`
--
ALTER TABLE `kits_models`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `licenses`
--
ALTER TABLE `licenses`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `license_seats`
--
ALTER TABLE `license_seats`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;

--
-- AUTO_INCREMENT for table `locations`
--
ALTER TABLE `locations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT for table `login_attempts`
--
ALTER TABLE `login_attempts`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `manufacturers`
--
ALTER TABLE `manufacturers`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `models`
--
ALTER TABLE `models`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `models_custom_fields`
--
ALTER TABLE `models_custom_fields`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `oauth_clients`
--
ALTER TABLE `oauth_clients`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `oauth_personal_access_clients`
--
ALTER TABLE `oauth_personal_access_clients`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `permission_groups`
--
ALTER TABLE `permission_groups`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `requested_assets`
--
ALTER TABLE `requested_assets`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `requests`
--
ALTER TABLE `requests`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `settings`
--
ALTER TABLE `settings`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `severity`
--
ALTER TABLE `severity`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `skill_level`
--
ALTER TABLE `skill_level`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `status_labels`
--
ALTER TABLE `status_labels`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `suppliers`
--
ALTER TABLE `suppliers`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `talent_groups`
--
ALTER TABLE `talent_groups`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `throttle`
--
ALTER TABLE `throttle`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tickets`
--
ALTER TABLE `tickets`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT for table `ticket_issues`
--
ALTER TABLE `ticket_issues`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `ticket_status`
--
ALTER TABLE `ticket_status`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=60;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
