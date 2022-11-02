USE MasterPC
GO

CREATE MASTER KEY ENCRYPTION BY   
PASSWORD = 'masterpc2022';

CREATE CERTIFICATE UsersManagement
   WITH SUBJECT = 'Users passwords';
GO

CREATE SYMMETRIC KEY UserPasswordsEncryption
    WITH ALGORITHM = AES_256  
    ENCRYPTION BY CERTIFICATE UsersManagement;  
GO

--SELECT * FROM MasterPC.sys.symmetric_keys;
--GO
--Delete from MasterPC.sys.symmetric_keys where name = 'UserPasswordsEncryption'


-- HOW TO USE:

--OPEN SYMMETRIC KEY UserPasswordsEncryption  
--DECRYPTION BY CERTIFICATE UsersManagement;
--UPDATE Logins.Users SET Username ='admin', Password = ENCRYPTBYKEY(Key_GUID('UserPasswordsEncryption'), '132461');
--CLOSE SYMMETRIC KEY UserPasswordsEncryption;
--GO

--OPEN SYMMETRIC KEY UserPasswordsEncryption  
--DECRYPTION BY CERTIFICATE UsersManagement;
--SELECT UserID, Username, Password, CONVERT(varchar,DECRYPTBYKEY(Password)) FROM Logins.Users
--CLOSE SYMMETRIC KEY UserPasswordsEncryption;
--GO

---- Open the symmetric key with which to encrypt the data.  
--OPEN SYMMETRIC KEY CreditCards_Key11  
--   DECRYPTION BY CERTIFICATE Sales09;  

---- Encrypt the value in column CardNumber using the  
---- symmetric key CreditCards_Key11.  
---- Save the result in column CardNumber_Encrypted.    
--UPDATE Sales.CreditCard  
--SET CardNumber_Encrypted = EncryptByKey(Key_GUID('CreditCards_Key11')  
--    , CardNumber, 1, HASHBYTES('SHA2_256', CONVERT( varbinary  
--    , CreditCardID)));  
--GO  

---- Verify the encryption.  
---- First, open the symmetric key with which to decrypt the data.  

--OPEN SYMMETRIC KEY CreditCards_Key11  
--   DECRYPTION BY CERTIFICATE Sales09;  
--GO  

---- Now list the original card number, the encrypted card number,  
---- and the decrypted ciphertext. If the decryption worked,  
---- the original number will match the decrypted number.  

--SELECT CardNumber, CardNumber_Encrypted   
--    AS 'Encrypted card number', CONVERT(nvarchar,  
--    DecryptByKey(CardNumber_Encrypted, 1 ,   
--    HASHBYTES('SHA2_256', CONVERT(varbinary, CreditCardID))))  
--    AS 'Decrypted card number' FROM Sales.CreditCard;  
--GO  