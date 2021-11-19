from django import forms

from .models import Article

from martor.widgets import AdminMartorWidget


class ArticleForm(forms.ModelForm):
    date = forms.DateField(widget=forms.DateInput(attrs={"type": "date"}, format="%Y-%m-%d"),
                           input_formats=["%Y-%m-%d"], label="Date")
    content = forms.CharField(widget=AdminMartorWidget)

    class Meta:
        model = Article
        fields = '__all__'


class ContactForm(forms.Form):
    vorname = forms.CharField()
    nachname = forms.CharField()
    email = forms.EmailField()
    nachricht = forms.CharField()

    def clean_nachricht(self):
        message = self.cleaned_data['nachricht']
        if 'http://' in message or 'https://' in message or 'usd' in message.lower():
            raise forms.ValidationError('In der Nachricht sind keine Links erlaubt.')
        return message
