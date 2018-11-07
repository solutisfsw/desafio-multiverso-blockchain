package desafioMorty;

import java.security.PublicKey;
import util.StringUtil;

/**
 *
 * @author Letícia Santos - laetitia.229@gmail.com
 */
public class TransacaoOutput {
    public String id;
    public PublicKey destinatario;
    public float valor;
    public String idTransacaoMae;

    public TransacaoOutput(PublicKey destinatario, float valor, String idTransacaoMae) 
    {
        this.destinatario = destinatario;
        this.valor = valor;
        this.idTransacaoMae = idTransacaoMae;
        this.id = StringUtil.applySha256(StringUtil.getStringFromKey(destinatario)+Float.toString(valor) + idTransacaoMae);
    }

    public boolean ehMeu(PublicKey publicKey) 
    {
        return (publicKey == destinatario);
    }
}
