package online.course.market.utils;

import javax.naming.NamingEnumeration;
import javax.naming.NamingException;
import javax.naming.directory.Attribute;
import javax.naming.directory.Attributes;
import javax.naming.directory.DirContext;
import javax.naming.directory.InitialDirContext;
import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.net.Socket;
import java.util.ArrayList;
import java.util.Hashtable;
import java.util.List;

public class EmailUtils {
    private EmailUtils(){
        throw new IllegalStateException("Utility class");
    }

    // Black domain list
    private static final String[] BLACK_DOMAIN = {"@mac.com", "@me.com", "@icloud.com"};


    /**
     * Listen response from server
     * @param bufferedReader {@link BufferedReader}
     * @return Status
     * @throws IOException throw Exception
     */
    private static int listenResponse(BufferedReader bufferedReader) throws IOException {
        String line;
        int res = 0;
        while ((line = bufferedReader.readLine()) != null) {
            String pfx = line.substring(0, 3);
            try {
                res = Integer.parseInt(pfx);
            } catch (Exception ex) {
                res = -1;
            }
            if (line.charAt(3) != '-') break;
        }
        return res;
    }

    /**
     * Send message to server
     *
     * @param wr      {@link BufferedWriter}
     * @param message Message
     * @throws IOException throw Exception
     */
    private static void sendMessage(BufferedWriter wr, String message)
            throws IOException {
        wr.write(message + "\r\n");
        wr.flush();
    }

    /**
     * Get list mail exchange
     *
     * @param hostName Host name
     * @return List mail exchange
     * @throws NamingException throw NamingException
     */
    private static List<String> getMX(String hostName)
            throws NamingException {
        // Perform a DNS lookup for MX records in the domain
        Hashtable<String, String> env = new Hashtable<>();
        env.put("java.naming.factory.initial",
                "com.sun.jndi.dns.DnsContextFactory");

        DirContext dirContext = new InitialDirContext(env);
        Attributes attrs = dirContext.getAttributes(hostName, new String[]{"MX"});

        Attribute attr = attrs.get("MX");
        // if we don't have an MX record, try the machine itself
        if ((attr == null) || (attr.size() == 0)) {
            attrs = dirContext.getAttributes(hostName, new String[]{"A"});
            attr = attrs.get("A");

            if (attr == null)
                throw new NamingException("No match for name '" + hostName + "'");
        }

        // Huzzah! we have machines to try. Return them as an array list
        // NOTE: We SHOULD take the preference into account to be absolutely
        //   correct. This is left as an exercise for anyone who cares.
        List<String> res = new ArrayList<>();
        NamingEnumeration<?> en = attr.getAll();

        while (en.hasMore()) {
            String x = (String) en.next();
            String[] f = x.split(" ");

            if (f[1].endsWith(".")) {
                f[1] = f[1].substring(0, (f[1].length() - 1));
            }
            res.add(f[1]);
        }
        return res;
    }

    /**
     * Check is valid email address
     * @param address Email address
     * @return True if valid else return false
     */
    public static boolean isAddressValid(String address) {
        // Find the separator for the domain name
        int pos = address.indexOf('@');

        // If the address does not contain an '@', it's not valid
        if (pos < 0) return false;

        // Isolate the domain/machine name and get a list of mail exchangers
        String domain = address.substring(++pos);
        List<String> mxList;

        try {
            mxList = getMX(domain);
        } catch (NamingException ex) {
            return false;
        }

        if (mxList.isEmpty()) return false;

        // Now, do the SMTP validation, try each mail exchanger until we get
        // a positive acceptance. It *MAY* be possible for one MX to allow
        // a message [store and forwarder for example] and another [like
        // the actual mail server] to reject it. This is why we REALLY ought
        // to take the preference into account.
        boolean valid = false;

        for (String mx : mxList) {
            try (Socket skt = new Socket(mx, 25)) {
                int res;
                BufferedReader rdr = new BufferedReader
                        (new InputStreamReader(skt.getInputStream()));
                BufferedWriter wtr = new BufferedWriter
                        (new OutputStreamWriter(skt.getOutputStream()));

                // Check header
                res = listenResponse(rdr);
                if (res != 220) {
                    throw new Exception(mx + " : Invalid header");
                }

                // Check ESMTP
                sendMessage(wtr, "EHLO ominext.com");
                res = listenResponse(rdr);
                if (res != 250) throw new Exception(mx + " : Not ESMTP");

                // Check sender address
                sendMessage(wtr, "MAIL FROM: <" + address + ">");
                res = listenResponse(rdr);
                if (res != 250) throw new Exception(mx + " : Sender rejected");

                // Check receipt address
                sendMessage(wtr, "RCPT TO: <" + address + ">");
                res = listenResponse(rdr);
                if (res != 250) {
                    throw new Exception(mx + " : Address is not valid!");
                }

                // Clear info, buffer, status tables and close session
                sendMessage(wtr, "RSET");
                sendMessage(wtr, "QUIT");

                valid = true;
                rdr.close();
                wtr.close();
            } catch (Exception ex) {
                valid = false;
            }
        }
        return valid;
    }

    /**
     * Check email exist black domain
     *
     * @param email Request email
     * @return {@link Boolean}
     */
    public static boolean checkExistBlackDomain(String email) {
        for (String s : BLACK_DOMAIN)
            if ((email.contains(s)))
                return true;
        return false;
    }
}
