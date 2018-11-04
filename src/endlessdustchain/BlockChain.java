/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package endlessdustchain;
import java.util.*;

/**
 *
 * @author Caio Victor Sampaio
 */
public class BlockChain {
    private ArrayList<Block> blockchain = new ArrayList<Block>();
    private ArrayList<Transaction> pendingTransactions = new ArrayList<Transaction>();
    private long miningReward = 50;
    private int DIFFICULTY = 2;
    
    public BlockChain(String address, long initialAmount){
        System.out.println("A new BlockChain was created!\n");
        Block genBlock = genesisBlock(address, initialAmount);
        this.blockchain.add(genBlock);
        this.pendingTransactions.clear();
        System.out.println("The First Wallet to receive " + initialAmount + " coins was: " + address + "\n");
    }
    
    public void mineTransactions(String minerAddress){
        Block box = new Block(new Date(), pendingTransactions, getLastBlock().getHash());
        System.out.println(minerAddress + " is Mining a Block...");
        box.mineBlock(DIFFICULTY);
        blockchain.add(box);
        
        pendingTransactions.clear();
        Transaction t = new Transaction("SYSTEM_REWARD",minerAddress,miningReward);
        createTransaction(t);
    }
    
    public void createTransaction(Transaction t){
        pendingTransactions.add(t);
    }
    
    public long getBalanceOfAddress(String add){
        long balance = 0;
        for(Block b : blockchain){
            for(Transaction t : b.getTransactions()){
                if(t.getFromAddress().equals(add))
                    balance -= t.getValue();
                if(t.getToAddress().equals(add))
                    balance += t.getValue();
            }
        }
        return balance;
    }
    
    public void printChain(){
        for(Block block : blockchain){
            System.out.println(block.toString());
        }
    }
    
    public Block getLastBlock(){
        return blockchain.get(blockchain.size()-1);
    }
    
    public ArrayList<Transaction> getTransactions(){
        return this.pendingTransactions;
    }
    
    private Block genesisBlock(String address, long initialAmount){
        Transaction t = new Transaction("SYSTEM_GENESIS",address,initialAmount);
        createTransaction(t);
        return new Block(new Date(),pendingTransactions,"0x00000000000000000");
    }
    /*  Not being used at the time
    boolean isChainValid(){
        Block prevBlock = null;
        Block currBlock = null;
        for(int i = 1; i < blockchain.size(); i++){
            prevBlock = blockchain.get(i-1);
            currBlock = blockchain.get(i);
            
            if(!currBlock.getHash().equals(currBlock.calculateHash()))
                return false;
            
            if(!currBlock.getPrevHash().equals(prevBlock.getHash()))
                return false;
        }
        return true;
    }*/
}
