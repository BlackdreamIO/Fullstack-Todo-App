
# Each User Will Have Their Own Collection

# For Each User When They Create A New Todo Document It Will Make A Indivial Document In Their Collection

# Authentication Is Required To Make Collection And Document

[FIREBAE_STRUCTURE]

USER >
    COLLECTION > ID : 'UCID' + USER_EMAIL
        DOCUMENT > ID : AUTO GENERATED // BY DEFAULT IT WILL HAVE TODO , PENDING , COMPLETE 
        DOCUMENT > ID : USER TODO COLUMN NAME
            title > VALUE : USER DETERMINED
            status > VALUE : USER DETERMINED
            time > VALUE : USER DETERMINED


# END