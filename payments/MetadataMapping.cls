public with sharing class MetadataMapping {
   
    //the format is
    /*static Map<String,Schema.SObjectField> fieldMapping = new  Map<String,Schema.SObjectField>{
      'metadata_key' => custom_object_field
    };*/

    //Example

    static Map<String,Schema.SObjectField> fieldMapping = new  Map<String,Schema.SObjectField>{
        'First Name' => bt_stripe__Transaction__c.Meta_First_Name__c,
        'Last Name' => bt_stripe__Transaction__c.Meta_Last_Name__c,
        'Email' => bt_stripe__Transaction__c.Meta_Email__c
    };
    
    static Map<String,Schema.SObjectField> customerFieldMapping = new  Map<String,Schema.SObjectField>{
        'First Name' => bt_stripe__Stripe_Customer__c.Meta_First_Name__c,
        'Last Name' => bt_stripe__Stripe_Customer__c.Meta_Last_Name__c,
        'Email' => bt_stripe__Stripe_Customer__c.Meta_Email__c
    };
    
    /*
      this class can be called from your trigger
      MetadataMapping.doTransactionMapping(Trigger.new);

    */
  
    
    public static void doTransactionMapping(List<bt_stripe__Transaction__c> traList){
    
          for(  bt_stripe__Transaction__c tra : traList){
              Map<String,String> metadataMap = tra.bt_stripe__Metadata__c!=null? 
                                               (Map<String,String>) JSON.deserialize(tra.bt_stripe__Metadata__c, Map<String,String>.class) : new Map<String,String>();
                                               
                                               
              if(metadataMap.size() > 0){
                  for(String mtKey : fieldMapping.keySet()){
                      if(metadataMap.get(mtKey)!=null){
                          tra.put(fieldMapping.get(mtKey),getValue(metadataMap.get(mtKey),fieldMapping.get(mtKey))); 
                      }     
                  }
              }                                 
          }
    }
    
    public static void doCustomerMapping(List<bt_stripe__Stripe_Customer__c> cusList){
    
          for(  bt_stripe__Stripe_Customer__c tra : cusList){
              Map<String,String> metadataMap = tra.bt_stripe__Metadata__c!=null? 
                                               (Map<String,String>) JSON.deserialize(tra.bt_stripe__Metadata__c, Map<String,String>.class) : new Map<String,String>();
                                               
                                               
              if(metadataMap.size() > 0){
                  for(String mtKey : fieldMapping.keySet()){
                      if(metadataMap.get(mtKey)!=null && customerFieldMapping.get(mtKey)!=null){
                          tra.put(customerFieldMapping.get(mtKey),getValue(metadataMap.get(mtKey),customerFieldMapping.get(mtKey))); 
                      }     
                  }
              }                                 
          }
    }
    
    private static Object getValue(String mapValue,Schema.SObjectField fld){
        try{
            Schema.SOAPType typeOfField = fld.getDescribe().getSOAPType();
            if(typeOfField == Schema.SOAPType.String){
                return mapValue;
            }
            
            if(typeOfField == Schema.SOAPType.Double){
                return Decimal.valueof(mapValue);
            }
        }catch(Exception e){
            system.debug(e);
        }
            //similiar add other datatype if needed - right now everything is string
        return null;   
    }
    
}
