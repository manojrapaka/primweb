package tr.com.entities;

import java.io.Serializable;
import java.util.Objects;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

/**
 * A Grup.
 */
@SuppressWarnings("serial")
@Entity
@Table(name = "grup")
public class Grup implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
      
    @Column(name = "adi")
    private String adi;

    @Column(name = "katsayi")
    private Double katsayi;

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

    public Double getKatsayi() {
        return katsayi;
    }

    public void setKatsayi(Double katsayi) {
        this.katsayi = katsayi;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        Grup grup = (Grup) o;

        if ( ! Objects.equals(id, grup.id)) return false;

        return true;
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(id);
    }

    @Override
    public String toString() {
        return "Grup{" +
                "id=" + id +
                ", adi='" + adi + "'" +
                ", katsayi='" + katsayi + "'" +
                '}';
    }
}
