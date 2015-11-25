package tr.com.entities;

import java.util.Objects;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

/**
 * A Prim.
 */
@Entity
@Table(name = "PRIM")
public class Prim {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    
    @Column(name = "adi")
    private String adi;
  
    @Column(name = "yuzde")
    private Double yuzde;

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

    public Double getYuzde() {
        return yuzde;
    }

    public void setYuzde(Double yuzde) {
        this.yuzde = yuzde;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        Prim prim = (Prim) o;

        if ( ! Objects.equals(id, prim.id)) return false;

        return true;
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(id);
    }

    @Override
    public String toString() {
        return "Prim{" +
                "id=" + id +
                ", adi='" + adi + "'" +
                ", yuzde='" + yuzde + "'" +
                '}';
    }
}
