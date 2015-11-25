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
 * A Ulke.
 */
@SuppressWarnings("serial")
@Entity
@Table(name = "ulke")
public class Ulke implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;


    @NotNull
    @Size(min = 1)        
    @Column(name = "adi", nullable = false)
    private String adi;

    @ManyToOne
    private Grup grup;

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

    public Grup getGrup() {
        return grup;
    }

    public void setGrup(Grup grup) {
        this.grup = grup;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        Ulke ulke = (Ulke) o;

        if ( ! Objects.equals(id, ulke.id)) return false;

        return true;
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(id);
    }

    @Override
    public String toString() {
        return "Ulke{" +
                "id=" + id +
                ", adi='" + adi + "'" +
                '}';
    }
}
