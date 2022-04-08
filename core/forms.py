from django import forms


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
