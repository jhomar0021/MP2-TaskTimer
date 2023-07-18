PLEASE IMPORT FIRST THE DATABASE SQL FILE FOR INITIAL TEMPLATE
1. Create your boiler plate with index.html
2. Create necessary folders for all your paths
3. Create your database structure
4. Put all your js assets if globally under js/ folder
5. If your js is under a specific put it under pages/your page/script.js
6. Create environment -> set all your database settings
7. Create configuration file
8. Include your configuration file on all of your apis
9. Create model file and put all your database tables as constant
10. Sample routes
    a. index -> Get all lists method is GET - no parameter index()
    b. store -> Inserting record method is POST store(array of values)
    c. update -> Updating certain records method is POST update(id, array of values)
    d. delete / destroy -> Delete a records method is POST delete(id)
    e. show -> Get only one record method is GET show(id)
10. Create api controller
    if (isset($_POST['trigger-variable'])) {
        //INPUT
        accumulate your request and do json_decode

        //PROCESS
        process your request and do some logic 

        //OUTPUT
        //output your response array through json_encode
    }
