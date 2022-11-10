public with sharing class AccountWrapper {
    @AuraEnabled
    public String name{get;set;}

    @AuraEnabled
    public List<Contact> contacts{get;set;}
}
