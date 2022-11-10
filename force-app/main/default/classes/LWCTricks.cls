public with sharing class LWCTricks {
    @AuraEnabled
    public static string createAccountContact(AccountWrapper accW){
        System.debug(accW);
        try {
            Account acc = new Account();
            acc.Name = accW.name;
            insert acc;
            System.debug(acc);
            if(accW.contacts != null){
                for(Contact c : accW.contacts){
                    c.AccountId = acc.Id;
                }
                insert accW.contacts;
            }
            // return 'Account Contact Record created Successfully';
            return acc.Id;
        } catch (Exception e) {
            // return e.getMessage();
            throw new AuraHandledException(e.getMessage());
        }
    }
    @AuraEnabled
    public static string createAccountOpp(OppWrapper oppW){
        try {
            System.debug(oppW);
            if(oppW != null){
                Opportunity opp = new Opportunity();
                opp.Name = oppW.name;
                opp.AccountId = oppW.accountId;
                opp.StageName = oppW.StageName;
                opp.CloseDate = oppW.CloseDate;
                insert opp;
                return 'Opportunity record created successfully: ' + opp.Id;
            }
            return 'Object is Empty';
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }

    public class OppWrapper {
        @AuraEnabled
        public String Name{get;set;}
        @AuraEnabled
        public String AccountId {get;set;}
        @AuraEnabled
        public String StageName{get;set;}
        @AuraEnabled
        public Date CloseDate{get;set;}
    }
}
