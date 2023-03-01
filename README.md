# Software Engineering Project 2022-2023

Group: SoftEng2022-39
Members:    Αλικάρης Αντώνιος Δημήτριος (el18062), 
            Αναστασία Θεοφίλη Μιτόγλου (el19828)

## Λήψη αρχείων εφαρμογής: 
git clone https://github.com/ntua/SoftEng22-39

### Import database:
1. Eγκατάσταση MySql Server και δημιουργία λογαριασμού με όνομα root και κωδικό root.
2. Σύνδεση σε MySql Server και δημιουργία κενού database με όνομα intelliQ:                                                                                                     
cmd:     mysql - u root - p
         (Εισαγωγή κωδικού)                                                                                                                                                         
mysql>   CREATE DATABASE intelliQ;
3. Εντός του φακέλου SoftEng22-39/data εκτέλεση στο cmd:                                                                                                                     
mysql -p -u root intelliQ< database_dump.sql

### Εγκατάσταση και εκτέλεση του backend
 1. cd SoftEng22-39/api-backend                                                                                                                                       
 2. npm install body-parser, express, path, json-2-csv, fs, https, mysql                                                                   
 3. node ./index.js      
 4. Επίσκεψη ιστοσελίδας https://localhost:9103/intelliq_api



### Εγκατάσταση και εκτέλεση του FrontEnd

