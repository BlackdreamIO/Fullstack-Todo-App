
[CreateCollectionForUser] @ CCFU
    <CreateCollectionForUser>, is responsible for creating a set of default documents within a collection associated with a specific user. Here's what it does:
    It generates a collection ID based on the user's email ('example42@gmail.com') and uses it to reference the user's collection in the database.
    It defines an array documents containing default document names (["ALL", "IMPORTANT", "COMPLETE"]) and another array definedRandomNumber containing associated random numbers.
    It iterates through the documents array, and for each document name, it sets a document within the collection using the name from documents and assigns a documentIdentity field with the corresponding value from definedRandomNumber

    ---------------------------------------------------------------------------------------------

[CreateDocumentForUser] @ CDFU
    <CreateDocumentForUser> is to create a new document within a specified collection in the database. 
    It takes in two parameters: 
    collectionRef: Specifies the collection in which the new document will be created. Defaults to 'app' if not provided.
    data: Contains the information or data to be stored within the new document. 

    ---------------------------------------------------------------------------------------------

[GetUserDocuments] @ GUD
    <GetUserDocuments>, retrieves information related to documents associated with the current user. 
    It operates within the user's collection in the database. It can retrieve either the document IDs 
    or the document data based on the parameter GetDataOf, which defaults to UserDocument.ID.
    If GetDataOf is set to UserDocument.ID, it returns an array containing the IDs of the user's documents.
    If GetDataOf is set to UserDocument.DATA, it retrieves and returns an array containing the data objects of the user's documents.

    ---------------------------------------------------------------------------------------------

[GetSpecificTodo] @ GST
    <GetSpecificTodo>, retrieves a particular document associated with a user. 
    It queries the database based on a provided documentIndexIdentity within the user's collection. 
    If found, it retrieves the document's data and returns it as an array. 
    If no matching document is found or an error occurs during the process, 
    it returns an empty array.

    ---------------------------------------------------------------------------------------------

[DeleteUserDocument] @ DUD
    <DeleteUserDocument> function attempts to remove a specific document associated with a user. 
    It verifies the existence of multiple documents before deletion and alerts the user if only one 
    document remains, preventing its deletion. The function handles deletion errors and notifies 
    users about success or failure.
