
# Each User Will Have Their Own Collection
# Authentication Is Required To Make Collection And Document

[FIREBAE_STRUCTURE]

USER >
    COLLECTION > ID : 'UCID' + USER_EMAIL
        DOCUMENT > ID : <USER_DEFINE> DEFAULT 2
            MAP FIELD : <USER_DEFINE>
                TITLE :  @STRING
                STATUS : @STRING
                DATE   : @TIME


# END