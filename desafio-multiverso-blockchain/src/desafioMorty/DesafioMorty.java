package desafioMorty;

import blockchain.Block;
import com.google.gson.GsonBuilder;
import java.security.Security;
import java.util.ArrayList;
import java.util.HashMap;
import util.StringUtil;
/**
 *
 * @author Letícia Santos - laetitia.229@gmail.com
 */
public class DesafioMorty {
    public static ArrayList<Block> blockchain = new ArrayList<Block>();
    public static HashMap<String,TransacaoOutput> to = new HashMap<String,TransacaoOutput>();
    public static int dificuldade = 3;
    public static float transacaoMinima = 0.1f;
    public static Carteira carteiraA;
    public static Carteira carteiraB;
    public static Transacao primeiraTransacao;
        
    public static void main(String[] args) 
    {
        Security.addProvider(new org.bouncycastle.jce.provider.BouncyCastleProvider()); 
        
        carteiraA = new Carteira();
        carteiraB = new Carteira();
        Carteira base = new Carteira();
        
        primeiraTransacao = new Transacao(base.chavePublica, carteiraA.chavePublica, 100f, null);
        primeiraTransacao.geraAssinatura(base.chavePrivada);
        primeiraTransacao.idTransacao = "0";
        primeiraTransacao.outputs.add(new TransacaoOutput(primeiraTransacao.destinatario, primeiraTransacao.valor, primeiraTransacao.idTransacao));
        to.put(primeiraTransacao.outputs.get(0).id, primeiraTransacao.outputs.get(0));
        
        System.out.println("Criando e minerando o bloco primário...");
        Block primario = new Block("0");
        primario.addTransacao(primeiraTransacao);
        addBloco(primario);

        Block block1 = new Block(primario.hash);
        System.out.println("\nO balanço da CarteiraA é: " + carteiraA.getBalanco());
        System.out.println("\nTentativa de envio de valores da CarteiraA para a CarteiraB...");
        System.out.println("Soldado: Letícia Santos. Hard Skills: C#; ASP.NET MVC 5; ASP.NET; Razor; JavaScript; HTML; CSS; Xamarin Forms; Entity Framework; Linq; Git; SQL Server; Java; Qualidade de Software; VB.NET; VB6. Soft Skills: Atenção a detalhes; Trabalho em equipe; Paciência; Compartilhamento de conhecimento; Inglês (CEFR - B2)");
        System.out.println("Origem: Terra, Sistema Solar; Destino: Solutis, Universo de inovação.");
        block1.addTransacao(carteiraA.enviaValor(carteiraB.chavePublica, 40f));
        addBloco(block1);
        System.out.println("\nWalletA's balance is: " + carteiraA.getBalanco());
        System.out.println("WalletB's balance is: " + carteiraB.getBalanco());

        Block block2 = new Block(block1.hash);
        System.out.println("\nWalletA Attempting to send more funds (1000) than it has...");
        block2.addTransacao(carteiraA.enviaValor(carteiraB.chavePublica, 1000f));
        addBloco(block2);
        System.out.println("\nWalletA's balance is: " + carteiraA.getBalanco());
        System.out.println("WalletB's balance is: " + carteiraB.getBalanco());

        Block block3 = new Block(block2.hash);
        System.out.println("\nWalletB is Attempting to send funds (20) to WalletA...");
        block3.addTransacao(carteiraB.enviaValor( carteiraA.chavePublica, 20));
        System.out.println("\nWalletA's balance is: " + carteiraA.getBalanco());
        System.out.println("WalletB's balance is: " + carteiraB.getBalanco());

        chainValida();
        
        String blockchainJson = new GsonBuilder().setPrettyPrinting().create().toJson(blockchain);
        System.out.print("\nBlockchain: " + blockchainJson);
    }
    
    public static Boolean chainValida()
    {
        Block blocoAtual; 
        Block blocoAnterior;
        String alvoHash = new String(new char[dificuldade]).replace('\0', '0');
        HashMap<String, TransacaoOutput> tempTo = new HashMap<String, TransacaoOutput>();
        tempTo.put(primeiraTransacao.outputs.get(0).id, primeiraTransacao.outputs.get(0));

        for(int i=1; i < blockchain.size(); i++) 
        {
            blocoAtual = blockchain.get(i);
            blocoAnterior = blockchain.get(i-1);
            
            if(!blocoAtual.hash.equals(blocoAtual.calculateHash()))
            {
                System.out.println("#Hashes atuais não são iguais");
                return false;
            }
            
            if(!blocoAnterior.hash.equals(blocoAtual.hashAnterior))
            {
                System.out.println("#Hashes anteriores não são iguais");
                return false;
            }
            
            if(!blocoAtual.hash.substring(0, dificuldade).equals(alvoHash))
            {
                System.out.println("#O bloco ainda não foi minerado");
                return false;
            }

            TransacaoOutput tempOutput;
            for(int t=0; t <blocoAtual.transacoes.size(); t++) 
            {
                Transacao transacaoAtual = blocoAtual.transacoes.get(t);

                if(!transacaoAtual.verificaAssinatura()) 
                {
                    System.out.println("#Signature on Transaction(" + t + ") is Invalid");
                    return false; 
                }
                
                if(transacaoAtual.getValorInput()!= transacaoAtual.getValorOutputs()) 
                {
                    System.out.println("#Inputs are note equal to outputs on Transaction(" + t + ")");
                    return false; 
                }

                for(TransacaoInput input: transacaoAtual.inputs) 
                {	
                    tempOutput = tempTo.get(input.idTransacaoOutput);

                    if(tempOutput == null) 
                    {
                        System.out.println("#Referenced input on Transaction(" + t + ") is Missing");
                        return false;
                    }

                    if(input.to.valor != tempOutput.valor) 
                    {
                        System.out.println("#Referenced input Transaction(" + t + ") value is Invalid");
                        return false;
                    }

                    tempTo.remove(input.idTransacaoOutput);
                }

                for(TransacaoOutput output: transacaoAtual.outputs) 
                {
                    tempTo.put(output.id, output);
                }

                if(transacaoAtual.outputs.get(0).destinatario != transacaoAtual.destinatario) 
                {
                    System.out.println("#Transaction(" + t + ") output reciepient is not who it should be");
                    return false;
                }
                if( transacaoAtual.outputs.get(1).destinatario != transacaoAtual.remetente) 
                {
                    System.out.println("#Transaction(" + t + ") output 'change' is not sender.");
                    return false;
                }

            }
        }
        
        System.out.println("Blockchain is valid");
        return true;
        
        /*Block blocoAtual;
        Block blocoAnterior;
        
        for(int i = 1; i < blockchain.size(); i++)
        {
            blocoAtual = blockchain.get(i);
            blocoAnterior = blockchain.get(i - 1);
            
            if(!blocoAtual.hash.equals(blocoAtual.calculateHash()))
            {
                System.out.println("Os hashes atuais não são iguais");
                return false;
            }
            
            if(!blocoAnterior.hash.equals(blocoAtual.hashAnterior))
            {
                System.out.println("Os hashes anteriores não são iguais");
                return false;
            }
        }
        
        return true;*/
    }
    
    public static void addBloco(Block blocoNovo) 
    {
        blocoNovo.minerarBloco(dificuldade);
        blockchain.add(blocoNovo);
    }
}
