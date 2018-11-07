package blockchain;

import desafioMorty.Transacao;
import java.util.ArrayList;
import java.util.Date;
import util.StringUtil;
/**
 *
 * @author Letícia Santos - laetitia.229@gmail.com
 */
public class Block {
    public String hash;
    public String hashAnterior;
    //private String data;
    private long timeStamp;
    private int nonce;
    public String merkleRoot;
    public ArrayList<Transacao> transacoes = new ArrayList<Transacao>();
    
    public Block(String hashAnterior) //(String data, String hashAnterior)
    {
        //this.data = data;
        this.hashAnterior = hashAnterior;
        this.timeStamp = new Date().getTime();
        this.hash = calculateHash();
    }
    
    public String calculateHash()
    {
        String hashCalculado = StringUtil.applySha256(
                                            hashAnterior + 
                                            Long.toString(timeStamp) + 
                                            Integer.toString(nonce) +
                                            merkleRoot);
                                            //data);
        return hashCalculado;
    }
    
    public void minerarBloco(int dificuldade)
    {
        String alvo = new String(new char[dificuldade]).replace('\0', '0');
        while(!hash.substring(0, dificuldade).equals(alvo))
        {
            nonce++;
            hash = calculateHash();
        }
        
        System.out.print("\nBloco minerado : " + hash);
    }
    
    public boolean addTransacao(Transacao transacao) 
    {
        if(transacao == null) return false;		
        if((hashAnterior != "0")) 
        {
            if((transacao.processaTransacao()!= true)) 
            {
                System.out.println("Falha ao processar transação");
                return false;
            }
        }
        transacoes.add(transacao);
        System.out.println("Transação adicionada ao bloco com sucesso");
        return true;
    }
}