/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package endlessdustchain;

import java.util.*;
import java.security.*;
import java.util.logging.Level;
import java.util.logging.Logger;

/**
 *
 * @author Caio Victor Sampaio
 */
public class Block {
    private static int GENINDEX = 1;
    private final int index;
    private final Date timestamp;
    private final ArrayList<Transaction> transactions;
    private long nonce = 0;
    private String hash;
    private final String prevHash;
    
    public Block(Date date, ArrayList<Transaction> transactions, String prevHash){
        this.index = GENINDEX;
        this.timestamp = date;
        this.transactions = new ArrayList<Transaction>(transactions);
        this.prevHash = prevHash;
        this.hash = calculateHash();
        GENINDEX++;
    }
  
    public String calculateHash(){
        MessageDigest md = null;
        try {
            md = MessageDigest.getInstance("SHA-256");
        } catch (NoSuchAlgorithmException ex) {
            Logger.getLogger(Block.class.getName()).log(Level.SEVERE, null, ex);
        }
        String msg = this.index + this.nonce + this.timestamp.toString() + this.transactions + this.prevHash;
        md.update(msg.getBytes());
        byte[] digest = md.digest();
        StringBuffer hexString = new StringBuffer();
        for (int i = 0;i<digest.length;i++){
            hexString.append(Integer.toHexString(0xFF & digest[i]));
        }
        return hexString.toString();
    }
    
    public void mineBlock(int difficulty){
        String target = "0";
        //Very Ugly, will fix if there is enough time...
        for(int i = 1; i < difficulty; i++){
            target = target + "0";
        }
        while(!this.hash.substring(0, difficulty).equals(target)){
            this.hash = calculateHash();
            this.nonce++;
        }
        System.out.println("Block Mined! " + this.hash);
    }
    
    public String getHash(){
        return this.hash;
    }
    
    public String getPrevHash(){
        return this.prevHash;
    }
    
    public ArrayList<Transaction> getTransactions(){
        return this.transactions;
    }
    
    private String printTransactions(){
        String print = "";
        for(Transaction t : this.transactions){
            print = print + t.toString() + "\n";
        }
        return print;
    }
    
    @Override
    public String toString() {
      return "--BLOCK--\n" +
             "Index:         " + index + "\n" +
             "Date:          " + timestamp + "\n" +
             "Block Hash:    " + hash + "\n" +
             "Previous Hash: " + prevHash + "\n" +
             "Transactions:  \n" + printTransactions() + "\n";
             
    }
}
