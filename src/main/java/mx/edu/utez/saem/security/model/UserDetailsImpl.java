package mx.edu.utez.saem.security.model;


import mx.edu.utez.saem.model.user.UserBean;
import mx.edu.utez.saem.service.user.UserService;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;


import java.util.Collection;
public class UserDetailsImpl implements UserDetails{
    private String email;
    private String password;
    private Boolean status;
    private Collection<? extends GrantedAuthority> authorities;

    public UserDetailsImpl(String email, String password, Boolean status, Collection<? extends GrantedAuthority> authorities) {
        this.email = email;
        this.password = password;
        this.status = status!=null? status: true;
        this.authorities = authorities;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return authorities;
    }
    public static UserDetailsImpl build(String emailOrUsername, String password, Boolean status,Collection<? extends GrantedAuthority> authorities){
        return new UserDetailsImpl(emailOrUsername, password,
                status, authorities);
    }

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public String getUsername() {
        return email;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return status;
    }
}
