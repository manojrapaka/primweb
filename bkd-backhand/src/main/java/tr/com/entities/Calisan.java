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

/**
 * A Calisan.
 */
@SuppressWarnings("serial")
@Entity
@Table(name = "calisan")
public class Calisan implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column(name = "adi")
    private String adi;

    @ManyToOne
    private Gorev gorev;

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

    public Gorev getGorev() {
        return gorev;
    }

    public void setGorev(Gorev gorev) {
        this.gorev = gorev;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        Calisan calisan = (Calisan) o;

        if ( ! Objects.equals(id, calisan.id)) return false;

        return true;
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(id);
    }

    @Override
    public String toString() {
        return "Calisan{" +
                "id=" + id +
                ", adi='" + adi + "'" +
                '}';
    }
}
