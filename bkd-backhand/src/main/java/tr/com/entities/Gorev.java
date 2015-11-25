package tr.com.entities;

import java.io.Serializable;
import java.util.Objects;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

/**
 * A Gorev.
 */
@SuppressWarnings("serial")
@Entity
@Table(name = "gorev")
public class Gorev implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;


    @NotNull
    @Size(min = 1, max = 100)        
    @Column(name = "adi", length = 100, nullable = false)
    private String adi;

    @ManyToOne
    private Prim prim;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getAdi() {
        return adi;
    }

    public void setAdi(String adi) {
        this.adi = adi;
    }

    public Prim getPrim() {
        return prim;
    }

    public void setPrim(Prim prim) {
        this.prim = prim;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        Gorev gorev = (Gorev) o;

        if ( ! Objects.equals(id, gorev.id)) return false;

        return true;
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(id);
    }

    @Override
    public String toString() {
        return "Gorev{" +
                "id=" + id +
                ", adi='" + adi + "'" +
                '}';
    }
}
