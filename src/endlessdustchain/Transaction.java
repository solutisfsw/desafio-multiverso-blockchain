/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package endlessdustchain;

/**
 *
 * @author Caio Victor Sampaio
 */
public class Transaction {
    private final String fromAddress;
    private final String toAddress;
    private final long value;
    
    public Transaction(String fromAddress, String toAddress, long value){
        this.fromAddress = fromAddress;
        this.toAddress = toAddress;
        this.value = value;
        System.out.println(">    New Transaction - From: " + fromAddress + ", To: " + toAddress + ", Value: " + value);
    }
    
    @Override
    public String toString() {
      return "    --TRANSACTION--\n" +
             "    From:  " + fromAddress + "\n" +
             "    To:    " + toAddress + "\n" +
             "    Value: " + value + "\n";
    }
    
    public String getFromAddress(){
        return this.fromAddress;
    }
    
    public String getToAddress(){
        return this.toAddress;
    }
    
    public long getValue(){
        return this.value;
    }
}
