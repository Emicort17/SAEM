package mx.edu.utez.saem.security.service;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import mx.edu.utez.saem.model.administrator.AdministratorBean;
import mx.edu.utez.saem.model.administrator.AdministratorRepository;
import mx.edu.utez.saem.model.user.UserBean;
import mx.edu.utez.saem.security.model.UserDetailsImpl;
import mx.edu.utez.saem.service.administrator.AdministratorService;
import mx.edu.utez.saem.service.user.UserService;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Collection;
import java.util.Optional;

@Service
@Transactional
@AllArgsConstructor
public class UserDetailsServiceImpl implements UserDetailsService {
    private  final UserService userService;
    private final AdministratorService administratorService;
    @Override
    public UserDetails loadUserByUsername(String emailOrUsername) throws UsernameNotFoundException {
        Optional<UserBean> foundUser = userService.findUserByEmail(emailOrUsername);
        Optional<AdministratorBean> foundAdmin = administratorService.findAdminByUsername(emailOrUsername);


        if(foundUser.isPresent()){
            UserBean user = foundUser.get();
            return UserDetailsImpl.build(user.getEmail(), user.getPassword(), user.getStatus(),userService.getAuthorities(user.getEmail()));
        }if(foundAdmin.isPresent()){
            AdministratorBean admin = foundAdmin.get();
            return UserDetailsImpl.build(admin.getUser(), admin.getPassword(),null ,userService.getAuthorities(admin.getUser()));
        }
        throw new UsernameNotFoundException("UsernameNotFound");
    }
}
