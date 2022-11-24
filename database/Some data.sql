-- Products

	-- Product categories

INSERT INTO Inventory.ProductCategories (CategoryName) VALUES ('Laptops')
GO

	-- Product brands

INSERT INTO Inventory.Brands (BrandName) VALUES ('Hp')
GO
INSERT INTO Inventory.Brands (BrandName) VALUES ('Asus')
GO

	-- Products

INSERT INTO Inventory.Products 
				(ProductName, 
				BrandID, 
				CategoryID, 
				UnitPrice, 
				UnitsInStock, 
				UnitsOnOrder, 
				ReorderLevel, 
				Discontinued, 
				ProductDescription)
			VALUES
				('ROG Zephyrus G15 Ultra Slim Gaming Laptop, 15.6” 165Hz QHD Display, GeForce RTX 3080, AMD Ryzen 9 5900HS, 16GB DDR4, 1TB PCIe NVMe SSD, Wi-Fi 6, Windows 10, Eclipse Gray, GA503QS-BS96Q',
				2,
				1,
				1500.00,
				25,
				0,
				10,
				0,
				'NVIDIA GeForce RTX 3080 8GB GDDR6 with ROG Boost up to 1345MHz at 80W (100W with Dynamic Boost 2.0);
				AMD Ryzen 9 5900HS processor (16M Cache, up to 4.5GHz);
				15.6” 165Hz IPS-Type Quad HD (2560 x 1440) display with adaptive sync;
				16GB 3200MHz DDR4 RAM | 1TB PCIe NVMe M.2 SSD | RGB Backlit Precision Gaming Keyboard | Windows 10 Home;
				Wi-Fi 6 (802.11ax) | USB Type-C Charging Capable | Color: Eclipse Gray;')
GO

INSERT INTO Inventory.Products 
				(ProductName, 
				BrandID, 
				CategoryID, 
				UnitPrice, 
				UnitsInStock, 
				UnitsOnOrder, 
				ReorderLevel, 
				Discontinued, 
				ProductDescription)
			VALUES
				('2022 ASUS ROG Zephyrus G14 GA402RJ-G14.R96700 (AMD Ryzen 9 6900HS, 16GB RAM, 1TB NVMe SSD, AMD Radeon RX 6700S, 14" WQXGA 120Hz, Windows 11) Gaming Notebook - Moonlight White',
				2,
				1,
				1350.00,
				20,
				0,
				10,
				0,
				'Display: 14" 120Hz 3ms IPS-Level WQXGA (2560 x 1600) Anti-Glare Display;
				Graphics Card: AMD Radeon RX 6700S 8GB GDDR6 at 80W (105W with AMD SmartShift);
				Processor: AMD Ryzen 9 6900HS 8 Cores (3.3GHz-4.9GHz, 16MB Cache, 35W);
				RAM: 16GB (8GB onboard + 8GB) DDR5 4800MHz | Hard Drive: 1TB PCIe NVMe SSD;
				OS: Microsoft Windows 11 Home | Warranty: 1-Year ASUS USA Warranty Parts & Labor + Lifetime Tech Support from EXCaliberPC;')
GO

INSERT INTO Inventory.Products 
				(ProductName, 
				BrandID, 
				CategoryID, 
				UnitPrice, 
				UnitsInStock, 
				UnitsOnOrder, 
				ReorderLevel, 
				Discontinued, 
				ProductDescription)
			VALUES
				('2022 HP Spectre 2-in-1 Laptop 16" 3K+ IPS Touchscreen Intel EVO Platform 12th Core i7-12700H Iris Xe Graphics 16GB DDR4 2TB SSD Wi-Fi 6e Thunderbolt 4 Backlit KB w/ FP and Pen Windows 11.',
				1,
				1,
				1630.00,
				20,
				0,
				10,
				0,
				'Latest 14-Core 12th Gen Intel Core i7-12700H mobile processor;
				16" UHD 3K+ (3072 x 1920) IPS, touchscreen, 400 nits, Low Blue Light, 10-point multitouch screen for hands-on control, powered by Intel Xe Graphics;
				Customization: Upgraded to 16GB DDR4 RAM, 2TB m.2 NVMe SSD, Convertible 2-in-1 Design, Windows 11 Home;
				Intel Wi-Fi 6e (AX211) 2x2 and Bluetooth 5.2;')
GO

	-- ProductPhotos

INSERT INTO Inventory.ProductPhotos (ProductID, Photo)
SELECT 1, BULKCOLUMN FROM OPENROWSET(BULK N'C:\Users\acuap\Desktop\Master pc images\Asus Rog Zephyus G15\RZG15 1.jpg', SINGLE_BLOB) AS DOCUMENT

INSERT INTO Inventory.ProductPhotos (ProductID, Photo)
SELECT 1, BULKCOLUMN FROM OPENROWSET(BULK N'C:\Users\acuap\Desktop\Master pc images\Asus Rog Zephyus G15\RZG15 2.jpg', SINGLE_BLOB) AS DOCUMENT

INSERT INTO Inventory.ProductPhotos (ProductID, Photo)
SELECT 1, BULKCOLUMN FROM OPENROWSET(BULK N'C:\Users\acuap\Desktop\Master pc images\Asus Rog Zephyus G15\RZG15 3.jpg', SINGLE_BLOB) AS DOCUMENT

INSERT INTO Inventory.ProductPhotos (ProductID, Photo)
SELECT 1, BULKCOLUMN FROM OPENROWSET(BULK N'C:\Users\acuap\Desktop\Master pc images\Asus Rog Zephyus G15\RZG15 4.jpg', SINGLE_BLOB) AS DOCUMENT

INSERT INTO Inventory.ProductPhotos (ProductID, Photo)
SELECT 1, BULKCOLUMN FROM OPENROWSET(BULK N'C:\Users\acuap\Desktop\Master pc images\Asus Rog Zephyus G15\RZG15 5.jpg', SINGLE_BLOB) AS DOCUMENT

INSERT INTO Inventory.ProductPhotos (ProductID, Photo)
SELECT 1, BULKCOLUMN FROM OPENROWSET(BULK N'C:\Users\acuap\Desktop\Master pc images\Asus Rog Zephyus G15\RZG15 6.jpg', SINGLE_BLOB) AS DOCUMENT

INSERT INTO Inventory.ProductPhotos (ProductID, Photo)
SELECT 1, BULKCOLUMN FROM OPENROWSET(BULK N'C:\Users\acuap\Desktop\Master pc images\Asus Rog Zephyus G15\RZG15 7.jpg', SINGLE_BLOB) AS DOCUMENT

INSERT INTO Inventory.ProductPhotos (ProductID, Photo)
SELECT 1, BULKCOLUMN FROM OPENROWSET(BULK N'C:\Users\acuap\Desktop\Master pc images\Asus Rog Zephyus G15\RZG15 8.jpg', SINGLE_BLOB) AS DOCUMENT


INSERT INTO Inventory.ProductPhotos (ProductID, Photo)
SELECT 2, BULKCOLUMN FROM OPENROWSET(BULK N'C:\Users\acuap\Desktop\Master pc images\Asus Rog Zephyus G14\RZG14 1.jpg', SINGLE_BLOB) AS DOCUMENT

INSERT INTO Inventory.ProductPhotos (ProductID, Photo)
SELECT 2, BULKCOLUMN FROM OPENROWSET(BULK N'C:\Users\acuap\Desktop\Master pc images\Asus Rog Zephyus G14\RZG14 2.jpg', SINGLE_BLOB) AS DOCUMENT

INSERT INTO Inventory.ProductPhotos (ProductID, Photo)
SELECT 2, BULKCOLUMN FROM OPENROWSET(BULK N'C:\Users\acuap\Desktop\Master pc images\Asus Rog Zephyus G14\RZG14 3.jpg', SINGLE_BLOB) AS DOCUMENT

INSERT INTO Inventory.ProductPhotos (ProductID, Photo)
SELECT 2, BULKCOLUMN FROM OPENROWSET(BULK N'C:\Users\acuap\Desktop\Master pc images\Asus Rog Zephyus G14\RZG14 4.jpg', SINGLE_BLOB) AS DOCUMENT

INSERT INTO Inventory.ProductPhotos (ProductID, Photo)
SELECT 2, BULKCOLUMN FROM OPENROWSET(BULK N'C:\Users\acuap\Desktop\Master pc images\Asus Rog Zephyus G14\RZG14 5.jpg', SINGLE_BLOB) AS DOCUMENT

INSERT INTO Inventory.ProductPhotos (ProductID, Photo)
SELECT 2, BULKCOLUMN FROM OPENROWSET(BULK N'C:\Users\acuap\Desktop\Master pc images\Asus Rog Zephyus G14\RZG14 6.jpg', SINGLE_BLOB) AS DOCUMENT

INSERT INTO Inventory.ProductPhotos (ProductID, Photo)
SELECT 2, BULKCOLUMN FROM OPENROWSET(BULK N'C:\Users\acuap\Desktop\Master pc images\Asus Rog Zephyus G14\RZG14 7.jpg', SINGLE_BLOB) AS DOCUMENT

INSERT INTO Inventory.ProductPhotos (ProductID, Photo)
SELECT 2, BULKCOLUMN FROM OPENROWSET(BULK N'C:\Users\acuap\Desktop\Master pc images\Asus Rog Zephyus G14\RZG14 8.jpg', SINGLE_BLOB) AS DOCUMENT


INSERT INTO Inventory.ProductPhotos (ProductID, Photo)
SELECT 3, BULKCOLUMN FROM OPENROWSET(BULK N'C:\Users\acuap\Desktop\Master pc images\Hp Spectre\HPS 1.jpg', SINGLE_BLOB) AS DOCUMENT

INSERT INTO Inventory.ProductPhotos (ProductID, Photo)
SELECT 3, BULKCOLUMN FROM OPENROWSET(BULK N'C:\Users\acuap\Desktop\Master pc images\Hp Spectre\HPS 2.jpg', SINGLE_BLOB) AS DOCUMENT

INSERT INTO Inventory.ProductPhotos (ProductID, Photo)
SELECT 3, BULKCOLUMN FROM OPENROWSET(BULK N'C:\Users\acuap\Desktop\Master pc images\Hp Spectre\HPS 3.jpg', SINGLE_BLOB) AS DOCUMENT

INSERT INTO Inventory.ProductPhotos (ProductID, Photo)
SELECT 3, BULKCOLUMN FROM OPENROWSET(BULK N'C:\Users\acuap\Desktop\Master pc images\Hp Spectre\HPS 4.jpg', SINGLE_BLOB) AS DOCUMENT

INSERT INTO Inventory.ProductPhotos (ProductID, Photo)
SELECT 3, BULKCOLUMN FROM OPENROWSET(BULK N'C:\Users\acuap\Desktop\Master pc images\Hp Spectre\HPS 5.jpg', SINGLE_BLOB) AS DOCUMENT




-- Para poder agregar fotos a ProductPhotos, por cuestiones de permisos, 
--	primeramente se necesita insertar los registros de en un servidor local y posteriormente exportarlos usando la herramienta de
--	exportación e importación de datos de SQL Server.