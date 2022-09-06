package com.crypto.server;

import com.crypto.server.currency.CryptCurrency;
import com.crypto.server.user.User;
import com.crypto.server.user.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class DataLoader {
	@Autowired
	UserRepository userRepository;


	List<CryptCurrency> miguelCurrencies = new ArrayList<>();
	CryptCurrency bitcoin = CryptCurrency.builder().code("BTC").name("Bitcoin").build();
	CryptCurrency ethereum = CryptCurrency.builder().name("Ethereum").code("ETH").build();
	User miguel = User.builder().user("miguel@debloat.us").currencies(miguelCurrencies).build();
}
