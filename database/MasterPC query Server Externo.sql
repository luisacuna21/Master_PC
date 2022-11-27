--USE master
--GO

--IF EXISTS (SELECT * FROM sysdatabases WHERE NAME='MasterPC')
--		DROP DATABASE MasterPC
--GO

--CREATE DATABASE MasterPC
--GO

USE MasterPC
GO

--CREATE LOGIN mp_admin WITH PASSWORD = '1234', DEFAULT_DATABASE = MasterPC;

CREATE SCHEMA Logins;
GO

CREATE TABLE Logins.Users(
	UserID int PRIMARY KEY IDENTITY (1,1),
	Username varchar(20) UNIQUE NOT NULL,
	Password varchar(100) NOT NULL,
	IsEmployee bit NOT NULL
)
GO

CREATE SCHEMA HumanResources;
GO

--SELECT * FROM sys.schemas;

CREATE TABLE HumanResources.Employees (
	EmployeeID int PRIMARY KEY IDENTITY (1, 1),
	FirstName varchar (10) NOT NULL ,
	LastName varchar (20) NOT NULL ,
	BirthDate datetime NOT NULL ,
	IdentificationNumber varchar(16) NOT NULL,
	HireDate datetime NOT NULL ,
	Address varchar (60) NULL ,
	City varchar (30) NULL ,
	Phone varchar (24) NULL ,
	Email varchar(50) NOT NULL,
	UserID int UNIQUE FOREIGN KEY REFERENCES Logins.Users (UserID)
)
GO
--ALTER TABLE	HumanResources.Employees ADD Email varchar(50) NOT NULL;
--GO

CREATE SCHEMA Customer;
GO

CREATE TABLE Customer.Customers (
	CustomerID int PRIMARY KEY IDENTITY (1,1),
	FullName varchar (50) NOT NULL,
	Email varchar(50) NOT NULL,
	City varchar(50) NOT NULL,
	PostalCode varchar(10) NOT NULL,
	Country varchar(50) NOT NULL,
	Phone varchar(24) NOT NULL,
	UserID int UNIQUE FOREIGN KEY REFERENCES Logins.Users (UserID)
)
GO
--ALTER TABLE	Customer.Customers ADD UserID int FOREIGN KEY REFERENCES Logins.Users (UserID)

CREATE TABLE Customer.ShippingAddresses(
	ShippingAddressID int PRIMARY KEY IDENTITY (1,1),
	CustomerID int FOREIGN KEY REFERENCES Customer.Customers (CustomerID) NOT NULL,
	ShippinAddress varchar(100) NOT NULL,
	AddressName varchar(30) NOT NULL,
	City varchar(50) NOT NULL,
	PostalCode varchar(10) NOT NULL,
	Country varchar(50) NOT NULL,
	Phone varchar(24) NOT NULL
)
GO

CREATE SCHEMA Shipper;
GO

CREATE TABLE Shipper.Shippers (
	ShipperID int PRIMARY KEY IDENTITY (1,1),
	CompanyName varchar (40) NOT NULL ,
	Phone varchar (24) NOT NULL ,
)
GO

CREATE SCHEMA Inventory;
GO

CREATE TABLE Inventory.Brands
(
	BrandID int PRIMARY KEY IDENTITY (1,1),
	BrandName  varchar(50) NOT NULL
)

CREATE TABLE Inventory.ProductCategories
(
	ProductCategoryID int PRIMARY KEY IDENTITY (1,1),
	CategoryName  varchar(50) NOT NULL
)
-- Agregar categor�a No categorizado

CREATE TABLE Inventory.Products (
	ProductID int PRIMARY KEY IDENTITY (1, 1),
	ProductName varchar (250) NOT NULL ,
	ProductShortName varchar(100) NULL,
	BrandID int FOREIGN KEY REFERENCES Inventory.Brands (BrandID) NOT NULL,
	--SupplierID int NULL ,
	CategoryID int FOREIGN KEY REFERENCES Inventory.ProductCategories (ProductCategoryID) NOT NULL ,
	UnitPrice decimal(8,2) NULL CONSTRAINT DF_Products_UnitPrice DEFAULT (0),
	UnitsInStock smallint NULL CONSTRAINT DF_Products_UnitsInStock DEFAULT (0),
	UnitsOnOrder smallint NULL CONSTRAINT DF_Products_UnitsOnOrder DEFAULT (0),
	ReorderLevel smallint NULL CONSTRAINT DF_Products_ReorderLevel DEFAULT (0),
	Discontinued bit NOT NULL CONSTRAINT DF_Products_Discontinued DEFAULT (0),
	ProductDescription varchar(500) NULL
)
GO
--ALTER TABLE Inventory.Products ADD ProductShortName varchar(100) NULL
--GO

--ALTER TABLE Inventory.Products ALTER COLUMN ProductName varchar(250) NOT NULL
--GO

--ALTER TABLE Inventory.Products ALTER COLUMN ProductDescription varchar(500) NOT NULL
--GO


-- .jpg or .jpeg
CREATE TABLE Inventory.ProductPhotos (
	ProductPhotoID int PRIMARY KEY IDENTITY (1,1),
	ProductID int FOREIGN KEY REFERENCES Inventory.Products (ProductID) NOT NULL,
	Photo varbinary(max) NULL,
	PhotoBase64 nvarchar(max) NULL
	--Extension varchar(10) NOT NULL
)
GO
--ALTER TABLE Inventory.ProductPhotos ADD PhotoBase64 nvarchar(max) NULL
--GO

CREATE SCHEMA Sale;
GO

CREATE TABLE Sale.Orders (
	OrderID int PRIMARY KEY IDENTITY (1, 1) NOT NULL ,
	CustomerID int FOREIGN KEY REFERENCES Customer.Customers (CustomerID) NOT NULL ,
	--EmployeeID int NULL ,
	OrderDate datetime DEFAULT CURRENT_TIMESTAMP,
	RequiredDate datetime NULL ,
	ShippedDate datetime NULL ,
	ShipperID int FOREIGN KEY REFERENCES Shipper.Shippers (ShipperID) ,
	--Freight money NULL CONSTRAINT DF_Orders_Freight DEFAULT (0),
	ShippingAddress varchar(100) NOT NULL,
	ShippingCity varchar(50) NOT NULL,
	ShippingPostalCode varchar(10) NOT NULL,
	Shippingcountry varchar(100) NOT NULL
)
GO

CREATE TABLE Sale.OrderDetails (
	Order_DetailID int PRIMARY KEY IDENTITY (1,1),
	OrderID int FOREIGN KEY REFERENCES Sale.Orders (OrderID) NOT NULL ,
	ProductID int FOREIGN KEY REFERENCES Inventory.Products (ProductID) NOT NULL ,
	UnitPrice decimal(8,2) NOT NULL DEFAULT (0),
	Quantity smallint NOT NULL DEFAULT (1),
	Discount decimal(3,2) NOT NULL DEFAULT (0),
)
GO

-- Encryption

USE MasterPC
GO

--CREATE MASTER KEY ENCRYPTION BY   
--PASSWORD = 'masterpc2022';

--CREATE CERTIFICATE UsersManagement
--   WITH SUBJECT = 'Users passwords';
--GO

--CREATE SYMMETRIC KEY UserPasswordsEncryption
--    WITH ALGORITHM = AES_256  
--    ENCRYPTION BY CERTIFICATE UsersManagement;  
--GO

-- Stored procedures

CREATE PROC spI_User
@Username varchar(20),
@Password varchar(100),
@IsEmployee bit,
@UserID int OUTPUT
AS
	BEGIN TRAN
	BEGIN TRY
		--OPEN SYMMETRIC KEY UserPasswordsEncryption
		--DECRYPTION BY CERTIFICATE UsersManagement;

		INSERT INTO Logins.Users (Username, Password, IsEmployee)
			VALUES (@Username, @Password, @IsEmployee);

		--CLOSE SYMMETRIC KEY UserPasswordsEncryption;

		SELECT @UserID = SCOPE_IDENTITY();

		COMMIT TRAN;
	END TRY
	BEGIN CATCH
		ROLLBACK TRAN;
	END CATCH
GO

EXEC spI_User 'admin', '1234', 1, 0
go

CREATE PROC spU_User
@UserID int,
@Username varchar(20),
@Password varchar(100),
@Updated bit = 0 OUTPUT
AS
	BEGIN TRAN
	BEGIN TRY
		--OPEN SYMMETRIC KEY UserPasswordsEncryption  
		--DECRYPTION BY CERTIFICATE UsersManagement;

		UPDATE Logins.Users SET Username = @Username, 
			Password = @Password
		WHERE UserID = @UserID;

		--CLOSE SYMMETRIC KEY UserPasswordsEncryption;

		SET @Updated = 1; -- Updated

		COMMIT TRAN;
	END TRY
	BEGIN CATCH
		SET @Updated = 0; -- Error
		ROLLBACK TRAN;
	END CATCH
GO

CREATE PROC spVerify_User
@UserID int = 0 OUTPUT,
@Username varchar(20),
@Password varchar(100),
@UsernameRight bit = 0 OUTPUT,
@Verified bit = 0 OUTPUT,
@IsEmployee bit = 0 OUTPUT
AS
	IF EXISTS (SELECT * FROM Logins.Users WHERE Username = @Username)
	BEGIN
		SET @UsernameRight = 1;

		--OPEN SYMMETRIC KEY UserPasswordsEncryption  
		--DECRYPTION BY CERTIFICATE UsersManagement;

		-- Variables para alamcenar datos de usuario que existe.
		--DECLARE @id int;
		--DECLARE @userN varchar(20);
		DECLARE @userpass varchar(100);

		SELECT @UserID = UserID, @userpass = Password, @IsEmployee = IsEmployee FROM Logins.Users
		WHERE Username = @Username;

		--SET @UserID = @id;

		IF (@userpass = @Password)
		BEGIN
			SET @Verified = 1;
		END
		ELSE
		BEGIN
			SET @Verified = 0;
		END

		--CLOSE SYMMETRIC KEY UserPasswordsEncryption;
	END
	ELSE
	BEGIN
		SET @UsernameRight = 0;
	END
GO

--DECLARE	@UserID int, @UsernameRight bit, @Verified bit;
--EXEC spVerify_User @UserID OUTPUT, 'admisn', '1234', @UsernameRight OUTPUT, @Verified OUTPUT

--SELECT @UserID as UserID, @UsernameRight as UsernameRight, @Verified as Verified