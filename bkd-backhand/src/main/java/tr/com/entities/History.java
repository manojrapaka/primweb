package tr.com.entities;

import java.io.Serializable;
import java.util.Objects;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import org.joda.time.LocalDate;

/**
 * A History.
 */
@SuppressWarnings("serial")
@Entity
@Table(name = "history")
public class History implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    
    @Column(name = "kolon_adi")
    private String kolonAdi;
    
    @Column(name = "deger")
    private String deger;
    
    @Column(name = "tablo_adi")
    private String tabloAdi;
    
    @Column(name = "tarih")
    private LocalDate tarih;
    
    @Column(name = "rec_id")
    private Long recId;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getKolonAdi() {
        return kolonAdi;
    }

    public void setKolonAdi(String kolonAdi) {
        this.kolonAdi = kolonAdi;
    }

    public String getDeger() {
        return deger;
    }

    public void setDeger(String deger) {
        this.deger = deger;
    }

    public String getTabloAdi() {
        return tabloAdi;
    }

    public void setTabloAdi(String tabloAdi) {
        this.tabloAdi = tabloAdi;
    }

    public LocalDate getTarih() {
        return tarih;
    }

    public void setTarih(LocalDate tarih) {
        this.tarih = tarih;
    }

    public Long getRecId() {
        return recId;
    }

    public void setRecId(Long recId) {
        this.recId = recId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        History history = (History) o;

        if ( ! Objects.equals(id, history.id)) return false;

        return true;
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(id);
    }

    @Override
    public String toString() {
        return "History{" +
                "id=" + id +
                ", kolonAdi='" + kolonAdi + "'" +
                ", deger='" + deger + "'" +
                ", tabloAdi='" + tabloAdi + "'" +
                ", tarih='" + tarih + "'" +
                ", recId='" + recId + "'" +
                '}';
    }
}
